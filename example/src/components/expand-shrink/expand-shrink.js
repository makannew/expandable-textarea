import React from 'react'
import ExpandableTextarea from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function ExpandShrink({ serverState, updateServer }) {
  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'expandShrink':
        updateServer(result[name])
        break
      default:
        return
    }
  }
  return (
    <div className='container'>
      <h4>Expand-shrink example</h4>
      <ExpandableTextarea
        placeholder='Type here'
        initialValue={serverState}
        submitValue={handleSubmit}
        totalLines={5}
        name='expandShrink'
        minRows={1}
        maxRows={5}
      />
      <h4>Code</h4>
      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers='true'
      >
        {`
import React from 'react'
import ExpandableTextarea from 'expandable-textarea'

export default function ExpandShrink({ serverState, updateServer }) {
  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'expandShrink':
        updateServer(result[name])
        break
      default:
        return
    }
  }
  return (
    <div className='container'>
      <h4>Expand-shrink example</h4>
      <ExpandableTextarea
        placeholder='Type here'
        initialValue={serverState}
        submitValue={handleSubmit}
        totalLines={5}
        name='expandShrink'
        minRows={1}
        maxRows={5}
      />
    </div>
  )
}

      `}
      </SyntaxHighlighter>
    </div>
  )
}
