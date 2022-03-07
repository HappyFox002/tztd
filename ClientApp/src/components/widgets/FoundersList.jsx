import React, { useState, useEffect } from 'react';
import Button from '../control/Button';
import CLayout from '../layouts/CLayout';
import HLayout from '../layouts/HLayout';
import HLine from '../visual/HLine';

import './CFList.css';
import FounderAdd from './FounderAdd';
import FounderItem from './FounderItem';

export default function FoundersList({formAction, foundersUrl, clientId, allFounders}){
    const [Founders, setFounders] = useState(null);

    let url = foundersUrl;
    if(!allFounders)
        url = foundersUrl + "?" + new URLSearchParams({ id: clientId }).toString();

    useEffect(() => { 
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setFounders(result);
            }
        )
    }, [clientId, allFounders]);

    const FormAddFounder = <FounderAdd />;

    const AddFounder = () => { 
        if (formAction)
            formAction("Добавление учредителя", FormAddFounder)
    };

    const panel = (<div>
                    <HLayout styles={{ justifyContent: "space-between" }}>
                      <Button name="Новый учредитель" action={AddFounder} styles={{border: "2px solid white", marginLeft: "auto", padding: "5apx", fontSize: "1.2em"}}/>
                        </HLayout>
                        <HLine color="white" />
                    </div>);

    if (Founders) {
        if(Founders.type == 0)
            return (
                <div>
                    {(allFounders) && panel}
                    <div className='List'>
                    {
                        Founders.response.map((data) =>  
                            <FounderItem formAction={formAction} key={data.id} item={ data}/>
                        )
                    }
                    </div>
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

FoundersList.defaultProps = { allFounders: false};