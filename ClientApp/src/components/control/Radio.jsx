import React, { useState, useEffect } from 'react'

import './Inputs.css';

export default function Radio({ name, label, onChange, value, checked }) {

    const [Checked, setChecked] = useState(checked);

    const handleChange = (e) => {
        setChecked(!Checked)
        if (onChange)
            onChange(e.target.value);
    }

    return (
            <div className='Radio'>
                <input id={ name + value} type="radio" name={name} onChange={handleChange} value={value} checked={Checked} />
                <label htmlFor={ name + value}>{label}</label>
            </div>
        );
}

Radio.default = { name: "radioBtn", label : "Кнопка" , checked: false};
