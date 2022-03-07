import React from 'react'
import Button from '../control/Button';

import './CFList.css';
import FounderEdit from './FounderEdit';

export default function FounderItem({formAction, item}) {
    const FormFounderEdit = <FounderEdit key={item.id} data={item}/>

    const activeEditFounder = () => { 
      console.log("123");
      if (formAction)
        formAction("Редактирование учредителя " + item.fullName, FormFounderEdit);
    };
  
  return (
    <div className='Item' style={(item.inn.length === 10) ? { backgroundColor: "#6fc" } : { backgroundColor: "#0cc" }}>
          <span className='Text' style={{ gridArea: "N" }}>{ item.fullName }</span>
          <span className='Text' style={{ gridArea: "I" }}>Инн: { item.inn }</span>
          <span className='Date' style={{ gridArea: "DA" }}>Добавлено: { new Date(item.dateAppend).toLocaleString("ru") }</span>
          <span className='Date' style={{ gridArea: "DU" }}>Обновлено: {new Date(item.dateEdit).toLocaleString("ru")}</span>
      <Button name="Изменить" action={activeEditFounder} styles={{ gridArea: "B1" }} />
      </div>
  )
}