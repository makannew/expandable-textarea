import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

export default function ExpandableTextarea({
  leftIcon,
  rightIcon,
  className,
  update, // parent function update({name:newValue}) , name:"inputName" prop should provided
  initialValue,
  maxLines, // if not defined textarea lines not limited
  autoResizeMin, // min row
  autoResizeMax, // max row
  rows, // if set will be fixed rows
  ...rest // additional standard textarea attributes like: disabled, wrap,...
}) {
  const [value, setValue] = useState(initialValue)
  const [cloneValue, setCloneValue] = useState(initialValue)
  const [lineCount, setLineCount] = useState(null)
  const [lineHeight, setLineHeight] = useState(null)
  const [currentCursor, setCurrentCursor] = useState(null)
  const [prevCursor, setPrevCursor] = useState(null)
  const [toggleToCurrent, forceToCurrent] = useState(false)
  const [toggleToPrev, forceToPrev] = useState(false)
  const [toggleToUpdate, forceToUpdate] = useState(false)

  const textAreaRef = useRef()
  const cloneTextArea = useRef()

  const { name } = rest
  if (!update) {
    rest.disabled = true
  }

  if (!rest.wrap) {
    rest.wrap = maxLines == 1 ? 'off' : 'on'
  }

  function submitChange() {
    if (initialValue != value && name) {
      update({ [name]: value })
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
        parseInt(getComputedStyle(cloneTextArea.current).lineHeight, 10)
    )
    setLineCount(newLineCount)
    const increasing = cloneValue.length > value.length
    if (maxLines && newLineCount > maxLines && increasing) {
      forceToCurrent(!toggleToCurrent)
      return
    }
    forceToPrev(!toggleToPrev)
    setValue(cloneValue)
  }, [cloneValue, lineHeight, toggleToUpdate])

  useLayoutEffect(() => {
    if (!textAreaRef.current) return
    textAreaRef.current.selectionStart = currentCursor
    textAreaRef.current.selectionEnd = currentCursor
  }, [value, toggleToPrev])

  useLayoutEffect(() => {
    if (!textAreaRef.current) return
    textAreaRef.current.selectionStart = prevCursor
    textAreaRef.current.selectionEnd = prevCursor
  }, [toggleToCurrent])

  function handleResize() {
    if (cloneTextArea.current) {
      setLineHeight(
        parseInt(getComputedStyle(cloneTextArea.current).lineHeight, 10)
      )
    }

    if (cloneTextArea.current && textAreaRef.current) {
      cloneTextArea.current.style.setProperty(
        'width',
        getComputedStyle(textAreaRef.current).width
      )
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
  if (value === undefined) return null
  return (
    <div className={className} onClick={focusOnText}>
      {leftIcon ? leftIcon : null}
      <textarea
        ref={textAreaRef}
        {...rest}
        rows={validRows()}
        value={value}
        onChange={handleChange}
        onBlur={submitChange}
        onKeyDown={saveCursorPos}
      />
      <textarea
        ref={cloneTextArea}
        style={{
          position: 'absolute',
          visibility: 'hidden'
        }}
        value={cloneValue}
        disabled={true}
        rows={1}
      ></textarea>
      {rightIcon ? rightIcon : null}
    </div>
  )
}
