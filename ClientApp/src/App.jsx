import React, { useState } from 'react'
import Button from './components/control/Button';
import CLayout from './components/layouts/CLayout';
import HLayout from './components/layouts/HLayout';
import VLayout from './components/layouts/VLayout';
import Panel from './components/supporting/Panel';
import HLine from './components/visual/HLine';
import ClientList from './components/widgets/ClientList';

import './main.css';

export default function App() {

    const [FormName, setFormName] = useState("Панель управления");
    const [FormComponent, setFormComponent] = useState(null);

    const HeaderForm = <div className='HFont'>{FormName}</div>;

    const ChangeForm = (text, elem) => { 
        setFormComponent(null);
        setFormName(text);
        setFormComponent(elem);
    };

    const FormAddClient = <h1>Добавление клиента</h1>;

    const AddClient = () => { 
        ChangeForm("Добавление клиента", FormAddClient);
    }

  return (
      <div className='App'>
          <Panel styles={{ gridArea: "L", padding: "20px" }}>
              <VLayout>
                  <HLayout>
                      <h2 className='HFont' style={{ width: "100%", margin: 0, padding: 0 }}>Клиенты</h2>
                      <Button name="+" action={AddClient} styles={{border: "2px solid white", padding: "10px" ,width: "20px", height: "20px", fontSize: "1.2em"}}/>
                  </HLayout>
                  <HLine color="white" />
                  <ClientList noActiveBtn={false} formAction={ChangeForm} clientsUrl='/getclients'/>
            </VLayout>
          </Panel>
          <Panel styles={{ gridArea: "H", color: "#6fc" }}>
              <CLayout styles={{ fontSize: "1.6em" }}>
                  {HeaderForm}
              </CLayout>
          </Panel>
          <Panel styles={{ gridArea: "F", padding: "20px" }}>
              {FormComponent}
          </Panel>
      </div>
  )
}
