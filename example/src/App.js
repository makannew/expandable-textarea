import React, { useEffect, useState, useRef } from 'react'

import ExpandableTextarea from 'expandable-textarea'

const App = () => {
  const [state, setState] = useState('')
  const [iniValue, setIniValue] = useState('0421978463')
  const [render, forceRender] = useState(false)
  // const parentRef = useRef()
  // useEffect(() => {
  //   parentRef.current.value = 'hello'
  // }, [])

  function handleChange(e) {
    setIniValue(e.target.value)
  }

  function limitedLenght(changeData) {
    const { newValue, valid } = changeData
    return { ...changeData, valid: newValue.length < 10 && valid }
  }

  function acceptNumbers(changeData) {
    const { pressedKey } = changeData
    if (!'0123456789'.includes(pressedKey)) {
      return { ...changeData, valid: false }
    }
    return { ...changeData }
  }

  function phoneFormat(changeData) {
    const acceptedChar = /\d/g
    const replaceChar = '!'
    const maskStr = '+(!!!)-!!!!-!!!!'
    const visibleMask = true
    const {
      pressedKey,
      newSelectionStart,
      newSelectionEnd,
      newValue,
      valid
    } = changeData
    const validChar = pressedKey.length === 1 && pressedKey.match(acceptedChar)
    if (
      validChar ||
      pressedKey === 'Delete' ||
      (pressedKey === 'Backspace' && valid)
    ) {
    } else {
      return { ...changeData, valid: false }
    }

    const unmaskVal = newValue.match(acceptedChar) || ['']
    let unmaskCursorPos = (
      newValue.slice(0, newSelectionStart).match(acceptedChar) || []
    ).length
    let unmaskIndex = 0
    let cursorPos = 0
    let maskedValue = ''
    let index = 0
    let maxIndex = unmaskVal.length
    let firstValidPos = false
    for (let i = 0, len = maskStr.length; i < len; ++i) {
      let thisChar = ''
      if (maskStr[i] === replaceChar) {
        firstValidPos = true
        if (index < maxIndex) {
          thisChar = unmaskVal[index]
          ++index
          if (unmaskIndex < unmaskCursorPos || !firstValidPos) {
            ++cursorPos
          }
          ++unmaskIndex
        } else {
          thisChar = ' '
        }
      } else {
        thisChar = maskStr[i]
        if (unmaskIndex < unmaskCursorPos || !firstValidPos) {
          ++cursorPos
        }
      }

      maskedValue += thisChar
      if (index >= maxIndex && !visibleMask) break
    }
    if (
      maskedValue[cursorPos] &&
      !maskedValue[cursorPos].match(acceptedChar) &&
      pressedKey === 'Delete'
    ) {
      let restValue = maskedValue.substr(cursorPos)
      if (restValue.match(acceptedChar)) {
        let moveCursor = maskStr.substr(cursorPos).indexOf(replaceChar)
        cursorPos += moveCursor >= 0 ? moveCursor : 0
      }
    }

    return {
      ...changeData,
      newValue: maskedValue,
      newSelectionStart: cursorPos,
      newSelectionEnd: cursorPos
    }
  }

  function passwordMasking(changeData) {
    let {
      pressedKey,
      newSelectionStart,
      newSelectionEnd,
      newValue,
      valid,
      unformatedValue,
      iniSelectionStart,
      iniSelectionEnd
    } = changeData
    if (!valid) return { ...changeData }
    let changes, newUnformatedValue
    if (unformatedValue === undefined) {
      newUnformatedValue = newValue
      changes = ''
      newSelectionStart = newValue.length
      newSelectionEnd = newValue.length
    } else {
      newUnformatedValue = unformatedValue
      changes = (newValue.match(/[^\*]/g) || ['']).join('')
    }
    let deleteVal = 0
    let backspaceVal = 0
    const notSelected = iniSelectionStart === iniSelectionEnd
    if (pressedKey === 'Delete' && notSelected) {
      deleteVal = 1
    }
    if (pressedKey === 'Backspace' && notSelected) {
      backspaceVal = 1
    }
    newUnformatedValue =
      newUnformatedValue.slice(0, iniSelectionStart - backspaceVal) +
      changes +
      newUnformatedValue.slice(iniSelectionEnd + deleteVal)
    return {
      ...changeData,
      unformatedValue: newUnformatedValue,
      newValue: newUnformatedValue.replace(/./g, '*'),
      newSelectionStart,
      newSelectionEnd
    }
  }

  return (
    <div>
      <h3>Example</h3>
      <ExpandableTextarea
        className='my-text'
        placeholder='Start development'
        submitValue={setState}
        rows={1}
        // cols={4}
        totalLines={1}
        name='testField'
        // minRows={2}
        // maxRows={5}
        // wrap='off'
        initialValue={iniValue}
        formatFunction={phoneFormat}
        // ref={parentRef}
        beforeElement={<p>Hello</p>}
        afterElement={<h1>Bye</h1>}
      />

      <textarea
        className='ordinary-text'
        placeholder='ordinary textarea'
        value={iniValue}
        onChange={handleChange}
        rows={3}
        cols={9}
        wrap='on'
      ></textarea>
      <h1
        onClick={() => {
          forceRender(!render)
        }}
      >
        Render
      </h1>
      <h3>Last update:{state.testField}</h3>
      <h3>Has changed:{state.differFromInitial ? 'Yes' : 'No'}</h3>
    </div>
  )
}

export default App
