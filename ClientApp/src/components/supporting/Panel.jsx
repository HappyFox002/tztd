import React from 'react'

import './Panel.css';

export default function Panel({styles, children}) {
  return (
      <div className='Panel' style={styles}>{children}</div>
  )
}
