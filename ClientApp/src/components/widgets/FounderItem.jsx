import React from 'react'

import './CFList.css';

export default function FounderItem({ item }) {

  console.log(item);
  console.log(item.inn.length);
  
  return (
    <div className='Item' style={(item.inn.length == 10) ? { backgroundColor: "#6fc" } : { backgroundColor: "#0cc" }}>
          <span className='Text' style={{ gridArea: "N" }}>{ item.fullName }</span>
          <span className='Text' style={{ gridArea: "I" }}>Инн: { item.inn }</span>
          <span className='Date' style={{ gridArea: "DA" }}>Добавлено: { new Date(item.dateAppend).toLocaleString("ru") }</span>
          <span className='Date' style={{ gridArea: "DU" }}>Обновлено: {new Date(item.dateEdit).toLocaleString("ru")}</span>
      </div>
  )
}
