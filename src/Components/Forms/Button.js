import React from 'react'
import styles from './Button.module.css'

const Button = ({children,disabled ,props}) => {
  return (
    <button className={styles.button} disabled={disabled} {...props}>{children}</button>
  )
}

export default Button