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
  const [cloneStylesLater] = useDelayedFunction(
    cloneStyles,
    resizeDebouncingDelay
  )

  const cloningStyles = [
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
  const cloneRef = useRef()
  const state = useRef({
    value: initialValue,
    cloneValue: initialValue,
    lineCount: 1
  }).current
  const { name } = rest
  if (!submitValue) {
    rest.disabled = true
  }

  if (!rest.wrap) {
    rest.wrap = maxLines == 1 ? 'off' : 'on'
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

  function handleChange(e) {
    const increasing = state.value.length > state.cloneValue.length
    state.currentCursor = e.target.selectionStart
    setClone(e.target.value)
    state.lineCount = getLineCount()

    if (maxLines && state.lineCount > maxLines && increasing) {
      cusrorTo(state.prevCursor)
      return
    }
    cusrorTo(state.currentCursor)
    setTextarea(state.cloneValue)
  }

  function setClone(value) {
    cloneRef.current.value = value
    state.cloneValue = value
  }

  function setTextarea(value) {
    textAreaRef.current.value = value
    state.value = value
  }

  function cusrorTo(value) {
    textAreaRef.current.selectionStart = value
    textAreaRef.current.selectionEnd = value
  }

  function getLineCount() {
    return Math.floor(
      cloneRef.current.scrollHeight /
        parseInt(getComputedStyle(cloneRef.current).height, 10)
    )
  }

  function submitChange() {
    if (initialValue != state.value && name) {
      submitValue({ [name]: state.value })
    }
  }

  function cloneStyles() {
    for (let style of cloningStyles) {
      cloneRef.current.style[style] = getComputedStyle(textAreaRef.current)[
        style
      ]
    }
  }

  function saveCursorPos(e) {
    state.prevCursor = e.target.selectionStart
  }

  function focusOnText(e) {
    e.preventDefault()
    textAreaRef.current.focus()
  }

  function validRows() {
    if (rows) return rows
    const { lineCount } = state
    if (autoResizeMax && lineCount > autoResizeMax) return autoResizeMax
    if (autoResizeMin && lineCount < autoResizeMin) return autoResizeMin
    return lineCount
  }

  console.log('rendered')
  return (
    <div onClick={focusOnText}>
      {leftIcon ? leftIcon : null}
      <textarea
        ref={textAreaRef}
        className={className}
        {...rest}
        rows={validRows()}
        value={state.value}
        onChange={handleChange}
        onBlur={submitChange}
        onKeyDown={saveCursorPos}
      />
      <textarea
        ref={cloneRef}
        style={{
          position: 'absolute',
          paddingTop: '0px',
          paddingBottom: '0px',
          border: '0px solid #000000',
          resize: 'none'
          // visibility: 'hidden'
        }}
        value={state.cloneValue}
        disabled={true}
        rows={1}
      ></textarea>
      {rightIcon ? rightIcon : null}
    </div>
  )
}
