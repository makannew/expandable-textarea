import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/nav/nav'
import ExpandShrink from './components/expand-shrink/expand-shrink'
import InputLikeField from './components/input-like-field/input-like-field'
import CreditCardFormat from './components/credit-card-format/credit-card-format'
import PhoneFormat from './components/phone-format/phone-format'
import PasswordFormat from './components/password-format/password-format'
import MockupServer from './components/mockup-server/mockup-server'

function App() {
  const [state, setState] = useState('')
  return (
    <BrowserRouter>
      <div className='top-panel'>
        <Nav />
        <MockupServer serverState={state} />
      </div>
      <Switch>
        <Route exact path='/' component={Nav} />
        <Route
          path='/expand-shrink'
          render={() => (
            <ExpandShrink serverState={state} updateServer={setState} />
          )}
        />
        <Route path='/input-like-field' component={InputLikeField} />
        <Route path='/credit-card-format' component={CreditCardFormat} />
        <Route path='/phone-format' component={PhoneFormat} />
        <Route path='/password-format' component={PasswordFormat} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

// import ExpandableTextarea, {
//   passwordFormating,
//   maskFormating
// } from 'expandable-textarea'

// const pp = () => {
//   const [state, setState] = useState('')
//   const [iniValue, setIniValue] = useState('0123456789')
//   const [render, forceRender] = useState(false)

//   const passwordFormat = passwordFormating(/[^\-]/, '-')
//   const creditCardFormat = maskFormating({
//     maskString: '!!!!-!!!!-!!!!-!!!!',
//     replaceChar: '!',
//     validChar: /\d/g,
//     preVisibleMask: true,
//     rightToLeft: false
//   })
//   const phoneFormat = maskFormating({
//     maskString: '(!!) !!!! !!!!',
//     replaceChar: '!',
//     validChar: /\d/g,
//     preVisibleMask: false,
//     rightToLeft: false
//   })

//   const customFormat = (changeData) => {
//     // it format typed number in parentheses
//     // by calling makFormating dynamically
//     const { newValue, valid } = changeData
//     if (!valid) return { ...changeData }
//     const newUnformatedValue = (newValue.match(/\d/g) || ['']).join('')
//     const maskString = '(' + ''.padEnd(newUnformatedValue.length, '!') + ')'
//     const newChangeData = maskFormating({
//       maskString,
//       validChar: /\d/g
//     })(changeData)
//     return { ...newChangeData, unformatedValue: newUnformatedValue }
//   }

//   // const parentRef = useRef()
//   // useEffect(() => {
//   //   parentRef.current.value = 'hello'
//   // }, [])

//   function handleChange(e) {
//     setIniValue(e.target.value)
//   }

//   function limitedLenght(changeData) {
//     const { newValue, valid } = changeData
//     return { ...changeData, valid: newValue.length < 10 && valid }
//   }

//   function acceptNumbers(changeData) {
//     const { pressedKey } = changeData
//     if (!'0123456789'.includes(pressedKey)) {
//       return { ...changeData, valid: false }
//     }
//     return { ...changeData }
//   }

//   return (
//     <div>
//       <h3>Example</h3>
//       <ExpandableTextarea
//         className='my-text'
//         placeholder='Start development'
//         submitValue={setState}
//         rows={1}
//         // cols={4}
//         totalLines={1}
//         name='testField'
//         // minRows={2}
//         // maxRows={5}
//         // wrap='off'
//         initialValue={iniValue}
//         formatFunction={customFormat}
//         // ref={parentRef}
//         beforeElement={<p>Hello</p>}
//         afterElement={<h1>Bye</h1>}
//       />

//       <textarea
//         className='ordinary-text'
//         placeholder='ordinary textarea'
//         value={iniValue}
//         onChange={handleChange}
//         rows={3}
//         cols={9}
//         wrap='on'
//       ></textarea>
//       <h1
//         onClick={() => {
//           forceRender(!render)
//         }}
//       >
//         Render
//       </h1>
//       <h3>Last update:{state.testField}</h3>
//       <h3>Has changed:{state.differFromInitial ? 'Yes' : 'No'}</h3>
//     </div>
//   )
// }
