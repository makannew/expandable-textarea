import React from 'react'
import ExpandableTextarea from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import AddressIcon from '../address-icon/address-icon'
import styles from './focus-by-icon.module.css'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function FocusByIcon({ serverState, updateServer }) {
  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'focusByIcon':
        updateServer(result[name])
        break
      default:
        return
    }
  }
  return (
    <div className='container'>
      <h4>Focus-by-icon example</h4>

      <ExpandableTextarea
        className={styles['address']}
        beforeElement={<AddressIcon />}
        placeholder='Address'
        initialValue={serverState}
        submitValue={handleSubmit}
        totalLines={3}
        name='focusByIcon'
        minRows={2}
        maxRows={3}
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
import AddressIcon from '../address-icon/address-icon'
import styles from './focus-by-icon.module.css'

export default function FocusByIcon({ serverState, updateServer }) {
  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'focusByIcon':
        updateServer(result[name])
        break
      default:
        return
    }
  }
  return (
    <div className='container'>
      <h4>Focus-by-icon example</h4>

      <ExpandableTextarea
        className={styles['address']}
        beforeElement={<AddressIcon />}
        placeholder='Address'
        initialValue={serverState}
        submitValue={handleSubmit}
        totalLines={3}
        name='focusByIcon'
        minRows={2}
        maxRows={3}
      />
    </div>
  )
}

      `}
      </SyntaxHighlighter>
      <h4 className='code-title'>CSS</h4>
      <SyntaxHighlighter
        className='code-style'
        language='css'
        style={thisStyle}
        showLineNumbers='true'
      >{`
/* CSS */

.address {
  display: flex;
  justify-content: center;
  align-items: center;
}
      `}</SyntaxHighlighter>
    </div>
  )
}
