import React from 'react'

import './Buttons.css';

export default function Button({name, action, styles}) {
  return (
      <div className='StandartButton' onClick={(e) => { e.preventDefault(); if(action)action(); }} style={ styles }>
          { name }
    </div>
  )
}
