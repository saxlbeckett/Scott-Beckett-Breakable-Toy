import React from 'react'
import * as Tone from 'tone'

const MicReverbInsert = ({mic, recorder}) => {
  const reverb = new Tone.Reverb(5).connect(recorder).toDestination();

  const onReverb = (event) => {
    event.preventDefault()
    mic.connect(reverb)
  }

  const noReverb = (event) => {
    event.preventDefault()
    mic.disconnect(reverb)
  }
 
  return(
    <section>
      <h6>Reverb: <br/>
        <input type="submit" onClick={onReverb} value="((0))"/>
        <input type="submit" onClick={noReverb} value="0"/>
      </h6>
    </section>
  )

}
export default MicReverbInsert