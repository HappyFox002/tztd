import React, { useState, useEffect } from 'react'
import CLayout from './../layouts/CLayout';
import ClientItem from './ClientItem';

import './CFList.css';

export default function ClientList({clientsUrl, formAction}) {
    const [Clients, setClients] = useState(null);

    useEffect(() => { 
        fetch(clientsUrl)
        .then(res => res.json())
        .then(
            (result) => {
                setClients(result);
            }
        )
    }, [Clients]);

    if (Clients) {
        if(Clients.type == 0)
            return (
            <div className='List'>
                {
                    Clients.response.map((data) =>  
                        <ClientItem formAction={formAction} key={ data.id } item={data}/>
                    )
                }
            </div>
            );
        else
            return (<h1 style={{color:"#0cc", marginTop:"20px", fontSize: "1.4em"}}>{Clients.messageError}</h1>);
    } else { 
        return <div className='List'><CLayout styles={{color:"#0cc", marginTop:"20px", fontSize: "1.4em"}}>Загрузка данных ...</CLayout></div>;
    }
}