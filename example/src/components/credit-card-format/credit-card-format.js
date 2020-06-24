import React, { useRef, useEffect } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function CreditCardFormat({ serverState, updateServer }) {
  const textareaRef = useRef()

  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'creditCardFormat':
        updateServer(result[name])
        break
      default:
        return
    }
  }
  const creditCardFormat = maskFormating({
    maskString: '!!!!-!!!!-!!!!-!!!!',
    replaceChar: '!',
    validChar: /\d/g,
    preVisibleMask: true,
    rightToLeft: false
  })

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <div className='container'>
      <h4>Credit card format example</h4>
      <ExpandableTextarea
        ref={textareaRef}
        className={'fixed-height'}
        placeholder='Credit card number'
        initialValue={serverState}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={creditCardFormat}
        name='creditCardFormat'
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

export default function CreditCardFormat({ serverState, updateServer }) {
  const textareaRef = useRef()

  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'creditCardFormat':
        updateServer(result[name])
        break
      default:
        return
    }
  }
  const creditCardFormat = maskFormating({
    maskString: '!!!!-!!!!-!!!!-!!!!',
    replaceChar: '!',
    validChar: /\d/g,
    preVisibleMask: true,
    rightToLeft: false
  })

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <div className='container'>
      <h4>Credit card format example</h4>
      <ExpandableTextarea
        ref={textareaRef}
        className={'fixed-height'}
        placeholder='Credit card number'
        initialValue={serverState}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={creditCardFormat}
        name='creditCardFormat'
      />
    </div>
  )
}

`}
      </SyntaxHighlighter>
    </div>
  )
}
