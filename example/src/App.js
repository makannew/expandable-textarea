import React, { useState } from 'react'

import ExpandableTextarea from 'expandable-textarea'

const App = () => {
  const [state, setState] = useState(null)

  return (
    <div>
      <h3>Example</h3>
      <ExpandableTextarea
        className='my-text'
        placeholder='Start development'
        submitValue={setState}
        rows={1}
        maxLines={1}
        name='name'
        // autoResizeMin={1}
        // autoResizeMax={3}
        // initialValue='initial value'
      />
    </div>
  )
}

export default App
