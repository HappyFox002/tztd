import React, { useState } from 'react'
import Button from './components/control/Button';
import CLayout from './components/layouts/CLayout';
import HLayout from './components/layouts/HLayout';
import VLayout from './components/layouts/VLayout';
import Panel from './components/supporting/Panel';
import HLine from './components/visual/HLine';
import ClientAdd from './components/widgets/ClientAdd';
import ClientList from './components/widgets/ClientList';
import FoundersList from './components/widgets/FoundersList';

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

    const FormAddClient = <ClientAdd />;
    const FormFounders = <FoundersList formAction={ChangeForm} allFounders={ true} foundersUrl="/getFounders"/>;

    const AddClient = () => { 
        ChangeForm("Добавление клиента", FormAddClient);
    }

    const ViewFounders = () => {
        ChangeForm("Учредители", FormFounders);
    };

  return (
      <div className='App'>
          <Panel styles={{ gridArea: "L", padding: "20px" }}>
              <VLayout>
                  <HLayout styles={{justifyContent: "space-between", height: "50px"}}>
                      <h2 className='HFont' style={{ width: "auto", margin: 0, padding: 0 }}>Клиенты</h2>
                      <Button name="Добавить" action={AddClient} styles={{border: "2px solid white", marginLeft: "auto", padding: "5px", fontSize: "1em"}}/>
                      <Button name="Учредители" action={ViewFounders} styles={{border: "2px solid white", padding: "5px", fontSize: "1em"}}/>
                  </HLayout>
                  <HLine color="white" />
                  <ClientList styles={{flexGrow: 3}} noActiveBtn={false} formAction={ChangeForm} clientsUrl='/getclients'/>
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
