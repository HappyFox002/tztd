import React, {useState, useEffect } from 'react'
import Button from '../control/Button';
import HLayout from '../layouts/HLayout';
import HLine from '../visual/HLine';

import './CFList.css';
import FounderSelectItem from './FounderSelectItem';

export default function FoundersSelectList({url, appendIds, styles, isEdit, clientId}) {
    const [Founders, setFounders] = useState(null);
    const [IdFounders, setIdFounders] = useState([]);
    const [DataLoad, setDataLoad] = useState(false);
    const [IdFoundersDel, setIdFoundersDel] = useState([]);
    
    useEffect(() => { 
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setFounders(result.response);
            }
        )

        if (isEdit) {
            let params = new URLSearchParams({ id: clientId });

            fetch("/getClientFounders", {
                method: 'POST',
                body: params
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        const newResult = result.response.map((item) => item.id);
                        setIdFounders(newResult);
                        setDataLoad(true);
                        console.log(newResult);
                    }
                )
        }
    }, [clientId]);

    useEffect(() => {
        //console.log("IdFounders " + IdFounders.toString() + ", IdFoundersDel " + IdFoundersDel.toString());
        if (appendIds)
                appendIds(IdFounders);
    }, [IdFounders, IdFoundersDel]);

    const SelectItem = (id, action) => {
        console.log({ id, action });

        if (!isEdit) {

            if (action) {
                setIdFounders([...IdFounders, id]);
            } else {
                setIdFounders(IdFounders.filter((item) => item != id));
            }
        } else { 

            if (action) {
                setIdFounders([...IdFounders, id]);
                if (IdFoundersDel.indexOf(id) != -1)
                    setIdFoundersDel(IdFounders.filter((item) => item != id));
            } else {
                setIdFounders(IdFounders.filter((item) => item != id));
                setIdFoundersDel([...IdFoundersDel, id]);
            }
        }
    };

    const UpdateIds = () => { 
        let params = new URLSearchParams({ id : clientId });
        IdFounders.forEach(function(item) {
            params.append("idsadd", item);
        });
        IdFoundersDel.forEach(function(item) {
            params.append("idsremove", item);
        });

        fetch("/updateFoundersClient", {
            method: 'POST',
            body: params
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                if (result.type == 0) {
                    window.location.reload();
                }
            }
        )
    };

    if (!isEdit) {
        return (
            <div className='List' style={styles}>
                {
                    (Founders) && Founders.map((data) =>
                        <FounderSelectItem key={data.id} item={data} selectAction={SelectItem} />
                    )
                }
            </div>
        );
    } else {
        return (
            <div className='List' style={styles}>
                <HLayout styles={{width: "100%", justifyContent : "center"}}>
                    <Button name="Обновить" action={UpdateIds} styles={{ border: "2px solid white", width: "60%", marginBottom: "20px" }} />
                </HLayout>
                <HLine color="white"/>
                {
                    (Founders && DataLoad) && Founders.map((data) =>
                        <FounderSelectItem key={data.id} item={data} selectAction={SelectItem} isSelect={IdFounders.indexOf(data.id) != -1}/>
                    )
                }
            </div>
        );
    }
}

FoundersSelectList.defaultProps = { isEdit: false, clientId: 0 };