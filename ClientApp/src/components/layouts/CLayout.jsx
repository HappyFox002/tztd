import React from 'react'

import './Layouts.css';

export default function CLayout({ children, styles }) {
  return (
      <div className='CL' style={styles}>{ children}</div>
  )
}
