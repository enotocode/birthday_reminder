import React from 'react'

const MyLink = ({ text, onClick }) => {

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {text}
    </a>
  )
}

export default MyLink