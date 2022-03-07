import React, { useState } from 'react'
import VLayout from '../layouts/VLayout';
import HLayout from '../layouts/HLayout';

import './Forms.css';
import Input from '../control/Input';
import Radio from '../control/Radio';
import Button from '../control/Button';
import HLine from '../visual/HLine';
import FoundersSelectList from './FoundersSelectList';

export default function ClientAdd() {

    const [FullNameValidTextError, setFullNameValidTextError] = useState("");
    const [FullNameValid, setFullNameValid] = useState(true);
    const [FullName, setFullName] = useState('');

    const [INNValidTextError, setINNValidTextError] = useState("");
    const [INNValid, setINNValid] = useState(true);
    const [INN, setINN] = useState('');

    const [AddValid, setAddValid] = useState(true);
    const [AddValidText, setAddValidText] = useState('');

    const [TypeOrgan, setTypeOrgan] = useState(0);

    let IdFounders = [];

    const UpdateIds = (ids) => { 
        IdFounders = ids;
        console.log(IdFounders);
    };

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

    const AddDate = () => {
        CheckFullNameValidText(FullName);
        CheckINNValidText(INN);

        if (!FullNameValid)
            return;
        if(!INNValid)
            return;

        if (INN.length == 12 && TypeOrgan == 0) {
            setAddValid(false);
            setAddValidText("Юридическое лицо не может иметь 12 значный ИНН");
            return;
        }
        if (INN.length == 10 && TypeOrgan == 1) { 
            setAddValid(false);
            setAddValidText("Индивидуальный предпрениматель не может иметь 10 значный ИНН");
            return;
        }
        if (IdFounders.length <= 0) { 
            setAddValid(false);
            setAddValidText("Не выбрано не одного учредителя");
            return;
        }
        
        setAddValid(true);
        setAddValidText("");

        //let def = { inn: INN, fullname: FullName, typeorganization: TypeOrgan, idsFounder : IdFounders.map((id) => id) };
        //console.log(def);
        let params = new URLSearchParams({ inn: INN, fullname: FullName, typeorganization: TypeOrgan });
        IdFounders.forEach(function(item) {
            params.append("idsfounder", item);
        });
        console.log(params.toString());

        fetch("/addclient", {
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
                    setAddValidText(result.messageError)
                    setAddValid(false)
                }
            }
        )
    }

    const UpdateTypeOrgan = (val) => { 
        setTypeOrgan(val);
    }

    return (
        <form className='FContainer'>
            <VLayout>
                {(!AddValid) && <div className='ValidError'>{AddValidText}</div>}
                {(!FullNameValid) && <div className='ValidError'>{FullNameValidTextError}</div>}
                {(!INNValid) && <div className='ValidError'>{INNValidTextError}</div>}
                <HLayout styles={{width: "100%", justifyContent : "center"}}>
                    <Button name="Добавить" action={AddDate} styles={{border: "2px solid white", margin: "30px 0" ,width: "60%"}}/>
                </HLayout>
                <HLine color="white"/>
                <HLayout styles={{ alignItems: "center", margin: "10px 0" }}>
                    <span style={{fontSize: "1.2em"}}>Название: </span>
                    <Input
                        name="fullName"
                        val={FullName}
                        valid={CheckFullNameValidText}
                        textError={FullNameValidTextError}
                        styles={{width: "100%", margin: "0 10px"}}
                    />
                </HLayout>
                <HLayout styles={{ alignItems: "center", margin: "10px 0" }}>
                    <span style={{fontSize: "1.2em"}}>ИНН: </span>
                    <Input
                        name="inn"
                        val={INN}
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
                <HLine color="white"/>
                <HLayout styles={{ justifyContent: "space-between", marginTop: "10px" }}>
                    <h2 className='HFont' style={{ width: "auto", margin: 0, padding: 0 }}>Выбор учредителей</h2>
                </HLayout>
                <FoundersSelectList appendIds={UpdateIds} url="/getfounders"/>
            </VLayout>
        </form>
    )
}