export function maskFormating(para = {}) {
  const {
    maskString = '!!!!-!!!!-!!!!-!!!!',
    replaceChar = '!',
    validChar = /\d/g,
    preVisibleMask = true,
    rightToLeft = false
  } = para

  return (changeData) => {
    let maskStr = maskString
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
      unformatedValue: (formated.match(validChar) || ['']).join(''),
      newValue: formated,
      newSelectionStart: cursorPos,
      newSelectionEnd: cursorPos
    }
  }
}
