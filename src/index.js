import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  forwardRef
} from 'react'
import useDelayedFunction from 'use-delayed-function'
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
    validation,
    resizeDebouncingDelay = 300,
    fitInField = false,
    ...rest // additional standard textarea attributes like: disabled, wrap,...
  },
  forwardedRef
) {
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
  const textAreaRef = useRef()
  const cloneRef = useRef()
  const pRef = useRef()
  const prevCursor = useRef()
  const currentCursor = useRef()
  const lineHeight = useRef()
  const [state, setState] = useState({
    value: initialValue,
    lineCount: minRows || 1
  })

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
    if (currentCursor.current) {
      setCursorState(currentCursor.current)
    }
  }, [state])

  useEffect(() => {
    if (forwardedRef) {
      forwardedRef.current = textAreaRef.current
    }
  }, [])

  function handleChange(e) {
    const newValue = e.target.value
    const iniLineCount = getLineCount(state.value)
    currentCursor.current = getCursorState(e.target)
    const increasing = newValue.length > state.value.length
    const lineCount = getLineCount(newValue)
    const shrinking = totalLines && iniLineCount > totalLines && !increasing
    if (totalLines && lineCount > totalLines && !shrinking) {
      currentCursor.current = prevCursor.current
      setState({ value: state.value, lineCount: iniLineCount })
      return
    }

    setState({ value: newValue, lineCount })
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
      submitValue({
        [name]: state.value,
        hasChanged: initialValue !== state.value
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

  function setCursorState({ cursorStart, cursorEnd, scrollTop, scrollLeft }) {
    const elem = textAreaRef.current
    elem.selectionStart = cursorStart
    elem.selectionEnd = cursorEnd
    elem.scrollTop = scrollTop
    elem.scrollLeft = scrollLeft
  }

  function handleKeyDown(e) {
    prevCursor.current = getCursorState(e.target)
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
