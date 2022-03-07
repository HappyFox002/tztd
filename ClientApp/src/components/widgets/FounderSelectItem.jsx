import React, { useState} from 'react'

import './CFList.css';

export default function FounderSelectItem({ item, selectAction, isSelect}) {  
  const [SelectItem, setSelectItem] = useState(isSelect);

  const Select = () => {
    if (selectAction) {
      const newSelect = !SelectItem;
      setSelectItem(newSelect);
      selectAction(item.id, newSelect);
    }
  };

  const GetStyle = () => { 
    if (!SelectItem) { 
      return (item.inn.length === 10) ? { backgroundColor: "#6fc" } : { backgroundColor: "#0cc" };
    }
    return { backgroundColor: "#ecb843" };
  };

  return (
    <div className='Item' onClick={Select} style={GetStyle()}>
        <span className='Text' style={{ gridArea: "N" }}>{ item.fullName }</span>
        <span className='Text' style={{ gridArea: "I" }}>Инн: { item.inn }</span>
        <span className='Date' style={{ gridArea: "DA" }}>Добавлено: { new Date(item.dateAppend).toLocaleString("ru") }</span>
        <span className='Date' style={{ gridArea: "DU" }}>Обновлено: {new Date(item.dateEdit).toLocaleString("ru")}</span>
      </div>
  )
}

FounderSelectItem.defaultProps = {isSelect : false};