import React, {useState, useEffect } from 'react'

import './CFList.css';
import FounderSelectItem from './FounderSelectItem';

export default function FoundersSelectList({url, appendIds, selectIds, styles}) {
    const [Founders, setFounders] = useState(null);

    let IdFounders = [];

    if (selectIds) {
        IdFounders = selectIds;
        console.log(IdFounders);
    }
    
    useEffect(() => { 
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.response);
                setFounders(result.response);
            }
        )
    }, []);

    const SelectItem = (id, action) => {
        if (!action)
            IdFounders.push(id);
        else
            IdFounders = IdFounders.filter((elem) => elem != id);
        if (appendIds)
            appendIds(IdFounders);    
    };

    if (selectIds) {
        return (
            <div className='List' style={styles}>
                {
                    (Founders) && Founders.map((data) => (IdFounders.indexOf(data.id) != -1) &&
                        <FounderSelectItem key={data.id} item={data} selectAction={SelectItem} />
                    )
                }
            </div>
        );
    }
    else
    {
        return (
            <div className='List' style={styles}>
                {
                    (Founders) && Founders.map((data) => 
                        <FounderSelectItem key={data.id} item={data} selectAction={SelectItem} />
                    )
                }
            </div>
        );
    }
}
