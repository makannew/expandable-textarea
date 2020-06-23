export function passwordMasking(para = {}) {
  const { allowedCharsRegEx = /[^\*]/g, makingChar = '*' } = para
  return (changeData) => {
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
      changes = (newValue.match(allowedCharsRegEx) || ['']).join('')
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
      newValue: newUnformatedValue.replace(/./g, makingChar),
      newSelectionStart,
      newSelectionEnd
    }
  }
}
