import React from 'react'

export default function VLine({ color }) {
    
    const styles = {
        height: "100%",
        borderRight: "2px solid "+color
    };

  return (
    <div style={styles}></div>
  )
}
