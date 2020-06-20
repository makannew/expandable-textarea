import React, { useEffect, useState, useRef } from 'react'

import ExpandableTextarea from 'expandable-textarea'

const App = () => {
  const [state, setState] = useState(null)
  // const parentRef = useRef()
  // useEffect(() => {
  //   parentRef.current.value = 'hello'
  // }, [])
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
        initialValue=''
        // ref={parentRef}
        beforeElement={<p>Hello</p>}
        afterElement={<h1>Bye</h1>}
      />

      <textarea
        className='ordinary-text'
        placeholder='ordinary textarea'
        rows={3}
        cols={9}
        wrap='on'
      ></textarea>
    </div>
  )
}

export default App
