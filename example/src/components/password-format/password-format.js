import React, { useState } from 'react'
import ExpandableTextarea, { passwordFormating } from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function PasswordFormat() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'passwordFormat':
        setState(value)
      default:
        return
    }
  }

  const passwordFormat = passwordFormating(/[^\-]/, '-')

  return (
    <div className='container'>
      <h4>Password format example</h4>
      <ExpandableTextarea
        className={'fixed-height'}
        placeholder='Password'
        initialValue={state}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={passwordFormat}
        name='passwordFormat'
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
import ExpandableTextarea, { passwordFormating } from 'expandable-textarea'

export default function PasswordFormat() {
  const [state, setState] = useState('')
  function handleSubmit({ name, value, differFromInitial }) {
    if (!differFromInitial) return
    switch (name) {
      case 'passwordFormat':
        setState(value)
      default:
        return
    }
  }

  const passwordFormat = passwordFormating(/[^\-]/, '-')

  return (
    <div className='container'>
      <h4>Password format example</h4>
      <ExpandableTextarea
        placeholder='Type here'
        initialValue={state}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={passwordFormat}
        name='passwordFormat'
      />
    </div>
  )
}
`}
      </SyntaxHighlighter>
    </div>
  )
}
