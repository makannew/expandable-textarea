import React, { useState } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function PhoneFormat() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'phoneFormat':
        setState(value)
      default:
        return
    }
  }

  const phoneFormat = maskFormating({
    maskString: '(!!) !!!! !!!!',
    replaceChar: '!',
    validChar: /\d/g,
    preVisibleMask: false,
    rightToLeft: false
  })

  return (
    <div className='container'>
      <h4>Phone format example</h4>
      <ExpandableTextarea
        placeholder='Phone number'
        className={'fixed-height'}
        initialValue={state}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={phoneFormat}
        name='phoneFormat'
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

export default function PhoneFormat() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'phoneFormat':
        setState(value)
      default:
        return
    }
  }

  const phoneFormat = maskFormating({
    maskString: '(!!) !!!! !!!!',
    replaceChar: '!',
    validChar: /\d/g,
    preVisibleMask: false,
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
        formatFunction={phoneFormat}
        name='phoneFormat'
      />
    </div>
  )
}
`}
      </SyntaxHighlighter>
    </div>
  )
}
