import React, { useState, useEffect, useRef, forwardRef } from 'react'
import useDelayedFunction from 'use-delayed-function'
export * from './format-functions/password-masking'
const ExpandableTextarea = forwardRef(function (
  {
    beforeElement,
    afterElement,
    className,
    submitValue, // ({name:newValue}, hasChanged) , name:"inputName"
    initialValue = '',
    totalLines, // if not defined textarea lines not limited
    minRows, // min row
    maxRows, // max row
    rows, // if set will be fixed rows
    formatFunction,
    resizeDebouncingDelay = 300,
    fitInField = false,
    ...rest // additional standard textarea attributes like: disabled, wrap,...
  },
  forwardedRef
) {
  const textAreaRef = useRef()
  const cloneRef = useRef()
  const pRef = useRef()
  const changeData = useRef({ unformatedValue: undefined })
  const lineHeight = useRef()
  const [state, setState] = useState({
    value: '',
    lineCount: minRows || 1
  })
  const [cloneStylesLater] = useDelayedFunction(
    cloneStyles,
    resizeDebouncingDelay
  )
  const cloningStyles = [
    'width',
    'border',
    'fontFamily',
    'fontSize',
    'fontWeight',
    'fontVariant',
    'fontStretch',
    'boxSizing',
    'paddingLeft',
    'paddingRight'
  ]

  const { name } = rest
  if (!submitValue) {
    rest.disabled = true
  }

  if (!rest.wrap) {
    rest.wrap = totalLines == 1 ? 'off' : 'on'
  }

  useEffect(() => {
    const styleObserver = new MutationObserver(cloneStyles)
    styleObserver.observe(textAreaRef.current, {
      attributes: true,
      attributeFilter: ['style']
    })
    cloneStyles()
    return () => {
      styleObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', cloneStylesLater)
    return () => {
      window.removeEventListener('resize', cloneStylesLater)
    }
  }, [])

  useEffect(() => {
    if (changeData.current) {
      const elem = textAreaRef.current
      const {
        newSelectionStart,
        newSelectionEnd,
        newScrollTop,
        newScrollLeft,
        iniSelectionStart,
        iniSelectionEnd,
        iniScrollTop,
        iniScrollLeft
      } = changeData.current
      if (changeData.current.valid) {
        elem.selectionStart = newSelectionStart
        elem.selectionEnd = newSelectionEnd
        elem.scrollTop = newScrollTop
        elem.scrollLeft = newScrollLeft
      } else {
        elem.selectionStart = iniSelectionStart
        elem.selectionEnd = iniSelectionEnd
        elem.scrollTop = iniScrollTop
        elem.scrollLeft = iniScrollLeft
      }
    }
  }, [state])

  useEffect(() => {
    if (forwardedRef) {
      forwardedRef.current = textAreaRef.current
    }
  }, [])

  useEffect(() => {
    handleKeyDown({ key: '' })
    prepareChangeData(state.value, initialValue)
    changeData.current.valid = true
    changeData.current.unformatedValue = undefined
    applyFormat()
  }, [initialValue])

  function handleChange(e) {
    prepareChangeData(state.value, e.target.value)
    const { newLineCount, excessIsShrinking } = changeData.current
    if (totalLines && newLineCount > totalLines && !excessIsShrinking) {
      changeData.current.valid = false
    } else {
      changeData.current.valid = true
    }
    applyFormat()
  }

  function prepareChangeData(iniValue, newValue) {
    const iniLineCount = getLineCount(iniValue)
    const {
      cursorStart: newSelectionStart,
      cursorEnd: newSelectionEnd,
      scrollTop: newScrollTop,
      scrollLeft: newScrollLeft
    } = getCursorState(textAreaRef.current)
    const increasing = newValue.length > iniValue.length
    const newLineCount = getLineCount(newValue)
    const excessIsShrinking =
      totalLines && iniLineCount > totalLines && !increasing
    changeData.current = {
      ...changeData.current,
      iniValue,
      iniLineCount,
      newValue,
      newLineCount,
      excessIsShrinking,
      increasing,
      newSelectionStart,
      newSelectionEnd,
      newScrollTop,
      newScrollLeft
    }
  }

  function applyFormat() {
    if (formatFunction) {
      changeData.current = formatFunction(changeData.current)
    }
    const {
      valid,
      iniValue,
      newValue,
      iniLineCount,
      newLineCount
    } = changeData.current
    if (valid) {
      setState({ value: newValue, lineCount: newLineCount })
    } else {
      setState({ value: iniValue, lineCount: iniLineCount })
    }
  }

  function getLineHeight() {
    lineHeight.current = parseInt(getComputedStyle(pRef.current).height, 10)
  }

  function getLineCount(value) {
    cloneRef.current.value = value
    return Math.floor(cloneRef.current.scrollHeight / lineHeight.current)
  }

  function submitChange() {
    if (typeof name === 'string') {
      const { unformatedValue } = changeData.current
      submitValue({
        [name]: unformatedValue || state.value,
        differFromInitial: initialValue !== (unformatedValue || state.value),
        name,
        unformatedValue: unformatedValue,
        value: state.value
      })
    }
  }

  function cloneStyles() {
    for (let style of cloningStyles) {
      cloneRef.current.style[style] = getComputedStyle(textAreaRef.current)[
        style
      ]
      if (style !== 'border') {
        pRef.current.style[style] = getComputedStyle(textAreaRef.current)[style]
      }
    }
    getLineHeight()
    cloneRef.current.style['height'] = `${lineHeight.current}px`
  }

  function getCursorState(elem) {
    return {
      cursorStart: elem.selectionStart,
      cursorEnd: elem.selectionEnd,

      scrollTop: elem.scrollTop,
      scrollLeft: elem.scrollLeft
    }
  }

  function handleKeyDown(e) {
    const {
      cursorStart: iniSelectionStart,
      cursorEnd: iniSelectionEnd,
      scrollTop: iniScrollTop,
      scrollLeft: iniScrollLeft
    } = getCursorState(textAreaRef.current)
    changeData.current = {
      ...changeData.current,
      iniSelectionStart,
      iniSelectionEnd,
      iniScrollTop,
      iniScrollLeft,
      pressedKey: e.key
    }
  }

  function focusOnText(e) {
    if (e.target !== textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }

  function validRows() {
    if (rows) return rows
    const { lineCount } = state
    if (maxRows && lineCount > maxRows) return maxRows
    if (minRows && lineCount < minRows) return minRows
    return lineCount
  }

  return (
    <div onClick={focusOnText}>
      {beforeElement ? beforeElement : null}
      <textarea
        ref={textAreaRef}
        className={className}
        {...rest}
        rows={validRows()}
        value={state.value}
        onChange={handleChange}
        onBlur={submitChange}
        onKeyDown={handleKeyDown}
      />
      <textarea
        ref={cloneRef}
        style={{
          position: 'absolute',
          paddingTop: '0px',
          paddingBottom: '0px',
          border: '0px solid #000000',
          resize: 'none',
          visibility: 'hidden'
        }}
        disabled={true}
        rows={1}
        cols={rest.cols}
        wrap={totalLines == 1 ? (fitInField == true ? 'on' : 'off') : rest.wrap}
      ></textarea>
      <p
        ref={pRef}
        style={{
          position: 'absolute',
          paddingTop: '0px',
          paddingBottom: '0px',
          border: '0px solid #000000',
          visibility: 'hidden'
        }}
      >
        1
      </p>
      {afterElement ? afterElement : null}
    </div>
  )
})

export default ExpandableTextarea
