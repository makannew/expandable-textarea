import React, { useRef, useEffect } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function CustomFormat({ serverState, updateServer }) {
  const textareaRef = useRef()

  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'customFormat':
        updateServer(result[name])
        break
      default:
        return
    }
  }

  const customFormat = (changeData) => {
    const { newValue, valid } = changeData
    if (!valid) return { ...changeData }
    const newUnformatedValue = (newValue.match(/\d/g) || ['']).join('')
    const maskString = '(' + ''.padEnd(newUnformatedValue.length, '!') + ')'
    const newChangeData = maskFormating({
      maskString,
      validChar: /\d/g
    })(changeData)
    return { ...newChangeData, unformatedValue: newUnformatedValue }
  }

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <div className='container'>
      <h4>Custom-format example</h4>
      <ExpandableTextarea
        ref={textareaRef}
        placeholder='Type numbers'
        initialValue={serverState}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={customFormat}
        name='customFormat'
      />
      <h4>Code</h4>
      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers='true'
      >
        {`
import React, { useRef, useEffect } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'

export default function CustomFormat({ serverState, updateServer }) {
  const textareaRef = useRef()

  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'customFormat':
        updateServer(result[name])
        break
      default:
        return
    }
  }

  const customFormat = (changeData) => {
    const { newValue, valid } = changeData
    if (!valid) return { ...changeData }
    const newUnformatedValue = (newValue.match(/\d/g) || ['']).join('')
    const maskString = '(' + ''.padEnd(newUnformatedValue.length, '!') + ')'
    const newChangeData = maskFormating({
      maskString,
      validChar: /\d/g
    })(changeData)
    return { ...newChangeData, unformatedValue: newUnformatedValue }
  }

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <div className='container'>
      <h4>Custom-format example</h4>
      <ExpandableTextarea
        ref={textareaRef}
        placeholder='Type numbers'
        initialValue={serverState}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={customFormat}
        name='customFormat'
      />
    </div>
  )
}

      `}
      </SyntaxHighlighter>
    </div>
  )
}
