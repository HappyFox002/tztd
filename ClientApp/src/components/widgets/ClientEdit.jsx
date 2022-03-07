import React, { useState, useEffect } from 'react'
import VLayout from '../layouts/VLayout';
import HLayout from '../layouts/HLayout';

import './Forms.css';
import Input from '../control/Input';
import Radio from '../control/Radio';
import Button from '../control/Button';
import FoundersSelectList from './FoundersSelectList';

export default function ClientEdit({ data, formAction }) {

    const [FullNameValidTextError, setFullNameValidTextError] = useState("");
    const [FullNameValid, setFullNameValid] = useState(true);
    const [FullName, setFullName] = useState(data.fullName);

    const [INNValidTextError, setINNValidTextError] = useState("");
    const [INNValid, setINNValid] = useState(true);
    const [INN, setINN] = useState(data.inn);

    const [EditValid, setEditValid] = useState(true);
    const [EditValidText, setEditValidText] = useState('');

    const [TypeOrgan, setTypeOrgan] = useState(data.typeOrganization);

    const CheckFullNameValidText = (txt) => {
        let check = true;
        if (txt.length < 5) {
            setFullNameValidTextError("Название не может быть меньше 4 cимволов")
            setFullNameValid(false);
            check = false;
        }
        if (txt.length > 60) {
            setFullNameValidTextError("Название не может быть больше 60 cимволов")
            setFullNameValid(false);
            check = false;
        }
        if (txt.trim() == '') {
            setFullNameValidTextError("Название не может быть пустым")
            setFullNameValid(false);
            check = false;
        }
        if (check) {
            setFullNameValidTextError("");
            setFullNameValid(true);
            setFullName(txt);
        }
        return check;
    };

    const CheckINNValidText = (txt) => {
        let check = true;
        if (txt.length < 10) { 
            setINNValidTextError("ИНН не может содержать меньше 10 символов")
            setINNValid(false);
            check = false;
        }
        if (txt.length > 12) { 
            setINNValidTextError("ИНН не может содержать больше 12 символов")
            setINNValid(false);
            check = false;
        }
        if (txt.length == 11) { 
            setINNValidTextError("ИНН не может иметь 11 символов")
            setINNValid(false);
            check = false;
        }
        if (check) {
            setINNValidTextError("");
            setINNValid(true);
            setINN(txt);
        }
        return check;
    };

    const UpdateDate = () => {
        if (!FullNameValid)
            return;
        if(!INNValid)
            return;

        if (INN.length == 12 && TypeOrgan == 0) {
            setEditValid(false);
            setEditValidText("Юридическое лицо не может иметь 12 значный ИНН");
            return;
        }
        if (INN.length == 10 && TypeOrgan == 1) { 
            setEditValid(false);
            setEditValidText("Индивидуальный предпрениматель не может иметь 10 значный ИНН");
            return;
        }
        
        setEditValid(true);
        setEditValidText("");

        let params = new URLSearchParams({id: data.id, inn : INN, fullname : FullName, typeorganization : TypeOrgan});

        fetch("/editClient", {
            method: 'POST',
            body: params
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                if (result.type == 0) {
                    window.location.reload();
                } else { 
                    setEditValidText(result.messageError)
                    setEditValid(false)
                }
            }
        )
    }

    const FoundersSelectListEdit = <FoundersSelectList isEdit={true} clientId={ data.id} url="/getFounders"/>;

    const UpdateTypeOrgan = (val) => { 
        setTypeOrgan(val);
    }

    const FormEditSelectItems = () => { 
        if (formAction)
            formAction("Изменение учредителей", FoundersSelectListEdit);
    };

    return (
        <form className='FContainer'>
            <VLayout>
                {(!EditValid) && <div className='ValidError'>{EditValidText}</div>}
                {(!FullNameValid) && <div className='ValidError'>{FullNameValidTextError}</div>}
                {(!INNValid) && <div className='ValidError'>{INNValidTextError}</div>}
                <HLayout styles={{ alignItems: "center", margin: "10px 0" }}>
                    <span style={{fontSize: "1.2em"}}>Название: </span>
                    <Input
                        name="fullName"
                        val={data.fullName}
                        valid={CheckFullNameValidText}
                        textError={FullNameValidTextError}
                        styles={{width: "100%", margin: "0 10px"}}
                    />
                </HLayout>
                <HLayout styles={{ alignItems: "center", margin: "10px 0" }}>
                    <span style={{fontSize: "1.2em"}}>ИНН: </span>
                    <Input
                        name="inn"
                        val={data.inn}
                        type="number"
                        valid={CheckINNValidText}
                        textError={INNValidTextError}
                        styles={{width: "100%", margin: "0 10px"}}
                    />
                </HLayout>
                <HLayout styles={{ alignItems: "center", margin: "10px 0" }}>
                    <span style={{ fontSize: "1.2em", whiteSpace: "nowrap"}}>Тип организации: </span>
                    <HLayout styles={{margin: "0 20px"}}>
                        <Radio name="typeOrgan" label="Юридический" value="0" onChange={UpdateTypeOrgan} checked={(TypeOrgan == 0)}/>
                        <Radio name="typeOrgan" label="Инидивидуальный" value="1" onChange={UpdateTypeOrgan} checked={(TypeOrgan == 1)}/>
                    </HLayout>
                </HLayout>
                <HLayout styles={{width: "100%", justifyContent : "center"}}>
                    <Button name="Изменить" action={UpdateDate} styles={{border: "2px solid white", margin: "30px 0" ,width: "60%"}}/>
                </HLayout>
                <HLayout styles={{width: "100%", justifyContent : "center"}}>
                    <Button name="Изменить учредителей" action={FormEditSelectItems} styles={{border: "2px solid white", width: "60%"}}/>
                </HLayout>
            </VLayout>
        </form>
    )
}