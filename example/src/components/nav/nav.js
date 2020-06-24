import React from 'react'
import styles from './nav.module.css'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const active = styles['active']
  return (
    <div className={styles['nav']}>
      <h3>Expandable-textarea Examples</h3>
      <div>
        <Link
          className={pathname === '/expand-shrink' ? active : ''}
          to='/expand-shrink'
        >
          Expand-shrink
        </Link>
        <Link
          className={pathname === '/input-like-field' ? active : ''}
          to='/input-like-field'
        >
          Input-like-field
        </Link>
        <Link
          className={pathname === '/focus-by-icon' ? active : ''}
          to='/focus-by-icon'
        >
          Focus-by-icon
        </Link>
        <Link
          className={pathname === '/credit-card-format' ? active : ''}
          to='/credit-card-format'
        >
          Credit-card-format
        </Link>
        <Link
          className={pathname === '/password-format' ? active : ''}
          to='/password-format'
        >
          Password-format
        </Link>
        <Link
          className={pathname === '/phone-format' ? active : ''}
          to='/phone-format'
        >
          Phone-format
        </Link>
        <Link
          className={pathname === '/custom-format' ? active : ''}
          to='/custom-format'
        >
          Custom-format
        </Link>
      </div>
    </div>
  )
}
