import React from 'react'
import { useState } from 'react';

import './Inputs.css';

export default function Input({ name, val, valid, type, styles}) {

  const [value, setValue] = useState(val);
  
  const handleChange = (e) => {
    setValue(e.target.value);
    valid(e.target.value)
  }

  return (
    <div className='inpCont inpError' style={styles}>
      <input type={ type} className='Input' name={name} value={value} onChange={handleChange} autoComplete="off"/>
    </div>
  )
}

Input.defaultProps = { val: 'Введите данные', type : 'text'};
