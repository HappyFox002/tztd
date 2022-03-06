import React, { useEffect } from 'react'
import Button from '../control/Button';

import './CFList.css';
import ClientEdit from './ClientEdit';
import FoundersList from './FoundersList';

export default function ClientItem({ item, formAction }) {

    const FormFounder = <FoundersList formAction={formAction} foundersUrl="/getfounderbyclient" clientId={item.id} />
    const FormClientEdit = <ClientEdit key={item.id} data={item}/>

    const activeFounders = () => {
        if(formAction)
            formAction("Учредители " + item.fullName, FormFounder);
    };

    const activeEditClient = () => { 
        if (formAction)
            formAction("Редактирование клиента " + item.fullName, FormClientEdit)
    };

  return (
      <div className='Item' style={(item.typeOrganization == 0) ? { backgroundColor: "#6fc" } : { backgroundColor: "#0cc" }}>
          <span className='Text' style={{ gridArea: "N" }}>{ item.fullName }</span>
          <span className='Text' style={{ gridArea: "I" }}>Инн: { item.inn }</span>
          <span className='Date' style={{ gridArea: "DA" }}>Добавлено: { new Date(item.dateAppend).toLocaleString("ru") }</span>
          <span className='Date' style={{ gridArea: "DU" }}>Обновлено: {new Date(item.dateEdit).toLocaleString("ru")}</span>
          <Button name="Изменить" action={activeEditClient} styles={{ gridArea: "B1" }} />
          <Button name="Учредители" action={activeFounders} styles={{ gridArea: "B2" }} />
      </div>
  )
}