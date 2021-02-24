import React from 'react'
import * as Tone from 'tone'

const MicHarmonizeInsert = ({mic, recorder}) => {
  const harmonizer = new Tone.PitchShift(5).connect(recorder).toDestination();

  const onHarmonize = (event) => {
    event.preventDefault()
    mic.connect(harmonizer)
  }

  const noHarmonize = (event) => {
    event.preventDefault()
    mic.disconnect(harmonizer)
  }
 
  return(
    <section>
      <h6>Harmonizer: <br/>
        <input type="submit" onClick={onHarmonize} value="+0+"/>
        <input type="submit" onClick={noHarmonize} value="-0-"/>
      </h6>
    </section>
  )

}
export default MicHarmonizeInsert