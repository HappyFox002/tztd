import React from 'react'

export default function HLine({ color }) {
    
    const styles = {
        width: "100%",
        borderBottom: "2px solid "+color
    };

  return (
    <div style={styles}></div>
  )
}
