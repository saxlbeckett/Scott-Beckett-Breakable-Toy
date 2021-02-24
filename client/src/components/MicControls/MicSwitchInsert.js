import React from 'react'
import * as Tone from 'tone'

const MicSwitchInsert = ({mic}) => {
  
  const micOn = (event) => {
    Tone.start()
    mic.open()
    alert("Mic open")
  }

  const micOff = (event) => {
    mic.close()
    alert("Mic closed")
  }
 
  return(
    <section>
      <h6>Mic On/Off: <br/>
        <input type="submit" onClick={micOn} value="O"/>
        <input type="submit" onClick={micOff} value="X"/>
      </h6>
    </section>
  )

}
export default MicSwitchInsert