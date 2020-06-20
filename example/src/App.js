import React, { useEffect, useState, useRef } from 'react'

import ExpandableTextarea from 'expandable-textarea'

const App = () => {
  const [state, setState] = useState(null)
  const [iniValue, setIniValue] = useState('iniValue')
  const [render, forceRender] = useState(false)
  // const parentRef = useRef()
  // useEffect(() => {
  //   parentRef.current.value = 'hello'
  // }, [])

  function handleChange(e) {
    setIniValue(e.target.value)
  }
  return (
    <div>
      <h3>Example</h3>
      <ExpandableTextarea
        className='my-text'
        placeholder='Start development'
        submitValue={setState}
        // rows={1}
        // cols={4}
        totalLines={3}
        name='name'
        minRows={2}
        maxRows={5}
        // wrap='off'
        initialValue={iniValue}
        // ref={parentRef}
        beforeElement={<p>Hello</p>}
        afterElement={<h1>Bye</h1>}
      />

      <textarea
        className='ordinary-text'
        placeholder='ordinary textarea'
        value={iniValue}
        onChange={handleChange}
        rows={3}
        cols={9}
        wrap='on'
      ></textarea>
      <h1
        onClick={() => {
          forceRender(!render)
        }}
      >
        Render
      </h1>
    </div>
  )
}

export default App
