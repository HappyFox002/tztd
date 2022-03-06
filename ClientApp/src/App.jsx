import React, { useState } from 'react'
import CLayout from './components/layouts/CLayout';
import VLayout from './components/layouts/VLayout';
import Panel from './components/supporting/Panel';
import HLine from './components/visual/HLine';
import ClientList from './components/widgets/ClientList';

import './main.css';

export default function App() {

    const [FormName, setFormName] = useState("Добавление нового клиента");
    const [FormComponent, setFormComponent] = useState(null);

    const HeaderForm = <div className='HFont'>{FormName}</div>;

    const ChangeForm = (text, elem) => { 
        setFormComponent(null);
        setFormName(text);
        setFormComponent(elem);
    };

  return (
      <div className='App'>
          <Panel styles={{ gridArea: "L", padding: "20px" }}>
            <VLayout>
                  <h2 className='HFont' style={{ width: "100%", margin: 0, padding: 0 }}>Клиенты</h2>
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
