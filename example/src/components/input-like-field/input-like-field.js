import React, { useState } from 'react'
import ExpandableTextarea from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function InputLikeField() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'inputLikeField':
        setState(value)
      default:
        return
    }
  }
  return (
    <div className='container'>
      <h4>Input-like-field example</h4>
      <ExpandableTextarea
        className={'fixed-height'}
        placeholder='Type here'
        initialValue={state}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        name='inputLikeField'
      />
      <h4>Code</h4>
      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers='true'
      >
        {`
<ExpandableTextarea
  placeholder='Type here'
  initialValue={state}
  submitValue={handleSubmit}
  rows={1}
  totalLines={1}
  name='inputLikeField'
/>
      `}
      </SyntaxHighlighter>
    </div>
  )
}
