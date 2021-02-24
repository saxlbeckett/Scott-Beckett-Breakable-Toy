import React from 'react'
import * as Tone from 'tone'

const MicVoxShiftInsert = ({mic, recorder}) => {
  const voiceShift = new Tone.PitchShift(-8).connect(recorder).toDestination();

  const onVoxShift = (event) => {
    event.preventDefault()
    mic.connect(voiceShift)
  }

  const noVoxShift = (event) => {
    event.preventDefault()
    mic.disconnect(voiceShift)
  }
 
  return(
    <section>
      <h6>Pitch Shifter:<br/>
        <input type="submit" onClick={onVoxShift} value="v0v"/>
        <input type="submit" onClick={noVoxShift} value="-0-"/>
      </h6>
    </section>
  )

}
export default MicVoxShiftInsert