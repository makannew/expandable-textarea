import React, { useRef, useEffect } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function PhoneFormat({ serverState, updateServer }) {
  const textareaRef = useRef()

  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'phoneFormat':
        updateServer(result[name])
        break
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

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <div className='container'>
      <h4>Phone format example</h4>
      <ExpandableTextarea
        ref={textareaRef}
        placeholder='Phone number'
        className={'fixed-height'}
        initialValue={serverState}
        submitValue={handleSubmit}
        rows={1}
        totalLines={1}
        formatFunction={phoneFormat}
        name='phoneFormat'
      />

      <h4 className='code-title'>Code</h4>
      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers='true'
      >
        {`
import React, { useRef, useEffect } from 'react'
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'

export default function PhoneFormat({ serverState, updateServer }) {
  const textareaRef = useRef()

  function handleSubmit(result) {
    const { name, differFromInitial } = result
    if (!differFromInitial) return
    switch (name) {
      case 'phoneFormat':
        updateServer(result[name])
        break
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

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <div className='container'>
      <h4>Phone format example</h4>
      <ExpandableTextarea
        ref={textareaRef}
        placeholder='Phone number'
        className={'fixed-height'}
        initialValue={serverState}
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
      <h4 className='code-title'>CSS</h4>
      <SyntaxHighlighter
        className='code-style'
        language='css'
        style={thisStyle}
        showLineNumbers='true'
      >{`
/* CSS */

.fixed-height > textarea {
  height: 2rem;
}

      `}</SyntaxHighlighter>
    </div>
  )
}
