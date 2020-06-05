import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import useDelayedFunction from 'use-delayed-function'
export default function ExpandableTextarea({
  leftIcon,
  rightIcon,
  className,
  submitValue, // parent function submitValue({name:newValue}) , name:"inputName" prop should provided
  initialValue = '',
  value,
  setValue,
  maxLines, // if not defined textarea lines not limited
  autoResizeMin, // min row
  autoResizeMax, // max row
  rows, // if set will be fixed rows
  validation,
  resizeDebouncingDelay = 300,
  ...rest // additional standard textarea attributes like: disabled, wrap,...
}) {
  const [internalValue, setInternalValue] = useState(initialValue)
  const [cloneValue, setCloneValue] = useState(initialValue)
  const [lineCount, setLineCount] = useState(null)
  const [lineHeight, setLineHeight] = useState(null)
  const [currentCursor, setCurrentCursor] = useState(null)
  const [prevCursor, setPrevCursor] = useState(null)
  const [toggleToCurrent, forceToCurrent] = useState(false)
  const [toggleToPrev, forceToPrev] = useState(false)
  const [toggleToUpdate, forceToUpdate] = useState(false)

  const [cloneStylesLater] = useDelayedFunction(
    cloneStyles,
    resizeDebouncingDelay
  )
  const stylesName = [
    'width',
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
  const cloneTextArea = useRef()
  const { name } = rest
  if (!submitValue) {
    rest.disabled = true
  }

  if (!rest.wrap) {
    rest.wrap = maxLines == 1 ? 'off' : 'on'
  }

  function submitChange() {
    if (initialValue != internalValue && name) {
      submitValue({ [name]: internalValue })
    }
  }

  function handleChange(e) {
    setCurrentCursor(e.target.selectionStart)
    setCloneValue(e.target.value)
    forceToUpdate(!toggleToUpdate)
  }

  useLayoutEffect(() => {
    if (!cloneTextArea.current || !textAreaRef.current) return
    const newLineCount = Math.floor(
      cloneTextArea.current.scrollHeight /
        parseInt(getComputedStyle(cloneTextArea.current).height, 10)
    )

    setLineCount(newLineCount)
    const increasing = cloneValue.length > internalValue.length
    if (maxLines && newLineCount > maxLines && increasing) {
      forceToCurrent(!toggleToCurrent)
      return
    }
    forceToPrev(!toggleToPrev)
    setInternalValue(cloneValue)
  }, [cloneValue, lineHeight, toggleToUpdate])

  useLayoutEffect(() => {
    if (!textAreaRef.current) return
    textAreaRef.current.selectionStart = currentCursor
    textAreaRef.current.selectionEnd = currentCursor
  }, [internalValue, toggleToPrev])

  useLayoutEffect(() => {
    if (!textAreaRef.current) return
    textAreaRef.current.selectionStart = prevCursor
    textAreaRef.current.selectionEnd = prevCursor
  }, [toggleToCurrent])

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

  function cloneStyles() {
    console.log('called')
    for (let style of stylesName) {
      cloneTextArea.current.style[style] = getComputedStyle(
        textAreaRef.current
      )[style]
    }
  }

  function saveCursorPos(e) {
    setPrevCursor(e.target.selectionStart)
  }

  function focusOnText(e) {
    e.preventDefault()
    textAreaRef.current.focus()
  }

  function validRows() {
    if (rows) return rows
    if (autoResizeMax && lineCount > autoResizeMax) return autoResizeMax
    if (autoResizeMin && lineCount < autoResizeMin) return autoResizeMin
    return lineCount
  }
  if (internalValue === undefined) return null
  return (
    <div onClick={focusOnText}>
      {leftIcon ? leftIcon : null}
      <textarea
        ref={textAreaRef}
        className={className}
        {...rest}
        rows={validRows()}
        value={internalValue}
        onChange={handleChange}
        onBlur={submitChange}
        onKeyDown={saveCursorPos}
      />
      <textarea
        ref={cloneTextArea}
        style={{
          position: 'absolute',
          paddingTop: '0px',
          paddingBottom: '0px',
          // boxSizing: 'content-box',
          border: '0px solid #000000',
          resize: 'none'
          // visibility: 'hidden'
        }}
        value={cloneValue}
        disabled={true}
        rows={1}
      ></textarea>
      {rightIcon ? rightIcon : null}
    </div>
  )
}
