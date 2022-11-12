import React from 'react'

const Button = (props) => {
    const { style, perform, title } = props

  return (
    <button
        className={style}
        onClick={perform}>
        {title}
    </button>
  )
}

export default Button