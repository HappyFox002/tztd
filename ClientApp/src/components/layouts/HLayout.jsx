import React from 'react'

import './Layouts.css';

export default function HLayout({ children, styles }) {
  return (
    <div className='HL' style={styles}>
      { children}
    </div>
  )
}
