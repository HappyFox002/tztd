import React, { useState, useEffect } from 'react';
import CLayout from '../layouts/CLayout';

import './CFList.css';
import FounderItem from './FounderItem';

export default function Founderslist({foundersUrl, clientId}){
    const [Founders, setFounders] = useState(null);

    const url = foundersUrl + "?" + new URLSearchParams({ id: clientId }).toString();

    useEffect(() => { 
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setFounders(result);
            }
        )
    }, [clientId]);

    if (Founders) {
        if(Founders.type == 0)
            return (
                <div className='List'>
                {
                    Founders.response.map((data) =>  
                        <FounderItem key={data.id} item={ data}/>
                    )
                }
            </div>
            );
        else
            return (<h1 style={{color:"#0cc", marginTop:"20px", fontSize: "1.4em"}}>{Founders.messageError}</h1>);
    }
    else
    {
        return <div className='List'><CLayout styles={{color:"#0cc", marginTop:"20px", fontSize: "1.4em"}}>Загрузка данных ...</CLayout></div>;
    }
}
