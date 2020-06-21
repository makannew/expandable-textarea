import React, { useEffect, useState, useRef } from 'react'

import ExpandableTextarea from 'expandable-textarea'

const App = () => {
  const [state, setState] = useState(null)
  const [iniValue, setIniValue] = useState('iniValue')
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
    const { pressedKey, newSelectionStart, newValue, valid } = changeData

    if (
      '0123456789'.includes(pressedKey) ||
      pressedKey == 'Delete' ||
      (pressedKey == 'Backspace' && valid)
    ) {
    } else {
      return { ...changeData, valid: false }
    }

    let val = newValue
    let cursorPos = newSelectionStart
    cursorPos -= (val.slice(0, cursorPos).match(/-/g) || []).length
    let r = /(\D+)/g,
      first3 = '',
      next3 = '',
      last4 = ''
    val = val.replace(r, '')
    let maskedValue
    if (val.length > 0) {
      first3 = val.substr(0, 3)
      next3 = val.substr(3, 3)
      last4 = val.substr(6, 4)
      if (val.length > 6) {
        maskedValue = first3 + '-' + next3 + '-' + last4
      } else if (val.length > 3) {
        maskedValue = first3 + '-' + next3
      } else if (val.length < 4) {
        maskedValue = first3
      }
    } else maskedValue = val
    for (let i = 0; i < cursorPos; ++i) {
      if (maskedValue[i] === '-') {
        ++cursorPos
      }
    }
    if (maskedValue[cursorPos] === '-' && pressedKey === 'Delete') {
      cursorPos++
    }

    return {
      ...changeData,
      newValue: maskedValue,
      newSelectionStart: cursorPos,
      newSelectionEnd: cursorPos
    }
  }

  function passwordMasking(changeData) {
    return { ...changeData }
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
        name='name'
        // minRows={2}
        // maxRows={5}
        // wrap='off'
        // initialValue={iniValue}
        validationFunction={passwordMasking}
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
    </div>
  )
}

export default App
