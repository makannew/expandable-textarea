import React, { useEffect, useRef } from 'react'
import styles from './mockup-server.module.css'
import useDelayedFunction from 'use-delayed-function'

export default function MockupServer({ serverState, setState }) {
  const pRef = useRef()
  const hRef = useRef()

  const [addStyleNow] = useDelayedFunction(addStyle)
  const [changeStyleLater] = useDelayedFunction(changeStyle, 1200)
  const [removeStyleLater] = useDelayedFunction(removeStyle, 800)

  function addStyle() {
    pRef.current.className = styles['updating']
    hRef.current.innerHTML = 'Updating...'
  }

  function changeStyle() {
    pRef.current.className = styles['just-updated']
    hRef.current.innerHTML = 'Done'
    pRef.current.innerHTML = serverState
    setState(serverState)
  }

  function removeStyle() {
    hRef.current.innerHTML = 'Mockup server'
    pRef.current.className = ''
  }

  useEffect(() => {
    addStyleNow().then(changeStyleLater).then(removeStyleLater)
  }, [serverState])

  return (
    <div className={styles['mockup-server']}>
      <h5 ref={hRef}>Mockup server</h5>
      <div className='page-divider'></div>
      <p ref={pRef}></p>
    </div>
  )
}
