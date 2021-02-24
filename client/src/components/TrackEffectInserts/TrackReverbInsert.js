import React from 'react'
import * as Tone from 'tone'

const TrackReverbInsert = ({recorder, player}) => {
  
  const trackReverb = new Tone.Reverb(5).connect(recorder).toDestination();

  const onTrackReverb = (event) => {
    event.preventDefault()
    player.connect(trackReverb)
  }

  const noTrackReverb = (event) => {
    event.preventDefault()
    player.disconnect(trackReverb)
  }

  return(
    <section>
      <h6>Reverb: <br/>
        <input type="submit" onClick={onTrackReverb} value=">O<"/>
        <input type="submit" onClick={noTrackReverb} value="O"/>
      </h6>
    </section>
  )

}
export default TrackReverbInsert