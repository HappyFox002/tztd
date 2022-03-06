import React from 'react'

import './Layouts.css';

export default function VLayout({ children, styles }) {
  return (
    <div className='VL' style={styles}>
      { children}
    </div>
  )
}
