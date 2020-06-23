import React, { useState } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function CreditCardFormat() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'creditCardFormat':
        setState(value)
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

  return (
    <div className='container'>
      <h4>Credit card format example</h4>
      <ExpandableTextarea
        className={'fixed-height'}
        placeholder='Credit card number'
        initialValue={state}
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
import React, { useState } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'

export default function CreditCardFormat() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'creditCardFormat':
        setState(value)
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

  return (
    <div className='container'>
      <h4>Credit card format example</h4>
      <ExpandableTextarea
        placeholder='Type here'
        initialValue={state}
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
