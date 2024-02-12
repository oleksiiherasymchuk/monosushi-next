import React from 'react'
import styles from './Title.module.scss'

type Props = {
  title?: string
}

const Title = ({ title }: Props) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      </div>
  )
}

export default Title