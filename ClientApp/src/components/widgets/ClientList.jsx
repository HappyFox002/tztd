import React, { useState, useEffect } from 'react'
import CLayout from './../layouts/CLayout';
import ClientItem from './ClientItem';

import './ClientList.css';

export default function ClientList({clientsUrl}) {
    const [Clients, setClients] = useState(null);

    useEffect(() => { 
        fetch(clientsUrl)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.response);
                setClients(result.response);
            }
        )
    }, []);

    if (Clients) {
        return (
            <div className='ClientList'>
                {
                    Clients.map((data) =>  
                        <ClientItem key={ data.id } item={data}/>
                    )
                }
            </div>
        );
    } else { 
        return <div className='ClientList'><CLayout styles={{color:"#0cc", marginTop:"20px", fontSize: "1.4em"}}>Загрузка данных ...</CLayout></div>;
    }
}
