import React, { useEffect, useState, useRef } from 'react'

import ExpandableTextarea, { passwordMasking } from 'expandable-textarea'

const App = () => {
  const [state, setState] = useState('')
  const [iniValue, setIniValue] = useState('0123456789')
  const [render, forceRender] = useState(false)

  const passwordFormat = passwordMasking()
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
    const validChar = /\d/g
    let maskStr = 'Card Number[!!!!-!!!!-!!!!-!!!!]'
    const replaceChar = '!'
    const preVisibleMask = false
    const rightToLeft = false
    let { pressedKey, newSelectionStart, newValue, valid } = changeData
    if (!valid) return { ...changeData }
    let unformated = (newValue.match(validChar) || ['']).join('')
    if (rightToLeft) {
      maskStr = Array.from(maskStr).reverse().join('')
      newValue = Array.from(newValue).reverse().join('')
      newSelectionStart = newValue.length - newSelectionStart
      newSelectionStart = newSelectionStart < 0 ? 0 : newSelectionStart
    }

    let alreadyValid = true
    for (let i = 0, len = newValue.length; i < len; ++i) {
      if (i > maskStr.length) {
        alreadyValid = false
        break
      }
      if (maskStr[i] === replaceChar && !newValue[i].match(validChar)) {
        alreadyValid = false
        break
      }
      if (maskStr[i] !== replaceChar && newValue[i] !== maskStr[i]) {
        alreadyValid = false
        break
      }
    }
    if (alreadyValid && pressedKey !== 'Delete' && pressedKey !== 'Backspace') {
      return { ...changeData, unformatedValue: unformated }
    }
    if (rightToLeft) {
      unformated = (newValue.match(validChar) || ['']).join('')
    }
    const totalReplace = maskStr.split(replaceChar).length - 1

    const unformatedPos = Math.min(
      (newValue.slice(0, newSelectionStart).match(validChar) || []).length,
      totalReplace
    )

    // const unformatedPos = (
    //   newValue.slice(0, newSelectionStart).match(validChar) || []
    // ).length
    let formated = ''
    let valIndex = 0
    let cursorPos = 0
    let firstReplaceHappened = false
    for (let i = 0, len = maskStr.length; i < len; ++i) {
      let thisChar = maskStr[i]
      let mustReplace = thisChar === replaceChar
      let valChar = valIndex < unformated.length ? unformated[valIndex] : ''
      if (mustReplace) {
        firstReplaceHappened = true
      }
      if (valIndex < unformatedPos || !firstReplaceHappened) {
        ++cursorPos
      }
      if (mustReplace) {
        formated += valChar
        ++valIndex
      } else {
        if (valChar) {
          formated += thisChar
        }
      }

      if (!valChar && preVisibleMask) {
        if (mustReplace) {
          formated += ' '
        } else {
          formated += thisChar
        }
      }

      if (!valChar && !preVisibleMask) {
        break
      }
    }

    if (
      formated[cursorPos] &&
      !formated[cursorPos].match(validChar) &&
      pressedKey === 'Delete'
    ) {
      let restValue = formated.substring(cursorPos)
      if (restValue.match(validChar)) {
        let moveCursor = maskStr.substring(cursorPos).indexOf(replaceChar)
        cursorPos += moveCursor >= 0 ? moveCursor : 0
      }
    }

    if (rightToLeft) {
      formated = Array.from(formated).reverse().join('')
      unformated = Array.from(unformated).reverse().join('')
      cursorPos = formated.length - cursorPos
      cursorPos = cursorPos < 0 ? 0 : cursorPos
    }

    return {
      ...changeData,
      unformatedValue: unformated,
      newValue: formated,
      newSelectionStart: cursorPos,
      newSelectionEnd: cursorPos
    }
  }

  // function passwordMasking(changeData) {
  //   let {
  //     pressedKey,
  //     newSelectionStart,
  //     newSelectionEnd,
  //     newValue,
  //     valid,
  //     unformatedValue,
  //     iniSelectionStart,
  //     iniSelectionEnd
  //   } = changeData
  //   if (!valid) return { ...changeData }
  //   let changes, newUnformatedValue
  //   if (unformatedValue === undefined) {
  //     newUnformatedValue = newValue
  //     changes = ''
  //     newSelectionStart = newValue.length
  //     newSelectionEnd = newValue.length
  //   } else {
  //     newUnformatedValue = unformatedValue
  //     changes = (newValue.match(/[^\*]/g) || ['']).join('')
  //   }
  //   let deleteVal = 0
  //   let backspaceVal = 0
  //   const notSelected = iniSelectionStart === iniSelectionEnd
  //   if (pressedKey === 'Delete' && notSelected) {
  //     deleteVal = 1
  //   }
  //   if (pressedKey === 'Backspace' && notSelected) {
  //     backspaceVal = 1
  //   }
  //   newUnformatedValue =
  //     newUnformatedValue.slice(0, iniSelectionStart - backspaceVal) +
  //     changes +
  //     newUnformatedValue.slice(iniSelectionEnd + deleteVal)
  //   return {
  //     ...changeData,
  //     unformatedValue: newUnformatedValue,
  //     newValue: newUnformatedValue.replace(/./g, '*'),
  //     newSelectionStart,
  //     newSelectionEnd
  //   }
  // }

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
        formatFunction={passwordFormat}
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
