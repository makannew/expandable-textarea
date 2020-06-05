import React from 'react'

import ExpandableTextarea from 'expandable-textarea'

const App = () => {
  return (
    <div>
      <h3>Example</h3>
      <ExpandableTextarea
        placeholder='Start development'
        rows={1}
        maxLines={1}
        name='email'
        initialValue='initial value'
      />
    </div>
  )
}

export default App
