import React from 'react'

import './ClientList.css';

export default function ClientItem({ item }) {
    
    console.log(item);

  return (
      <div className='ClientItem' style={(item.typeOrganization == 0) ? { backgroundColor: "#6fc" } : { backgroundColor: "#0cc" }}>
          <span hidden>{item.id}</span>
          <span className='Text' style={{ gridArea: "N" }}>{ item.fullName }</span>
          <span className='Text' style={{ gridArea: "I" }}>Инн: { item.inn }</span>
          <span className='Date' style={{ gridArea: "DA" }}>Добавлено: { new Date(item.dateAppend).toLocaleString("ru") }</span>
          <span className='Date' style={{ gridArea: "DU" }}>Обновлено: { new Date(item.dateEdit).toLocaleString("ru") }</span>
      </div>
  )
}
