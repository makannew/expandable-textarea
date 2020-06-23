import React from 'react'
import styles from './nav.module.css'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className={styles['nav']}>
      <h3>Expandable-textarea Examples</h3>

      <div>
        <Link className={styles['router-link']} to='/expand-shrink'>
          Expand-shrink
        </Link>
        <Link className={styles['router-link']} to='/input-like-field'>
          Input-like-field
        </Link>
        <Link className={styles['router-link']} to='/focus-by-icon'>
          Focus-by-icon
        </Link>
        <Link className={styles['router-link']} to='/credit-card-format'>
          Credit-card-format
        </Link>
        <Link className={styles['router-link']} to='/password-format'>
          Password-format
        </Link>
        <Link className={styles['router-link']} to='/phone-format'>
          Phone-format
        </Link>
        <Link className={styles['router-link']} to='/custom-format'>
          Custom-format
        </Link>
      </div>
    </div>
  )
}
