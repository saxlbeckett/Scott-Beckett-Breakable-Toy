import React from 'react'
import * as Tone from 'tone'

const PitchShiftInsert = ({recorder, player}) => {
  const pitchShift = new Tone.PitchShift(-12).connect(recorder).toDestination();

  const onPitch = (event) => {
    event.preventDefault()
    player.connect(pitchShift)
  }

  const noPitch = (event) => {
    event.preventDefault()
    player.disconnect(pitchShift)
  }

  return(
    <section>
      <h6>Pitch: <br/>
        <input type="submit" onClick={onPitch} value="V"/>
        <input type="submit" onClick={noPitch} value="-"/>
      </h6>
    </section>
  )

}
export default PitchShiftInsert