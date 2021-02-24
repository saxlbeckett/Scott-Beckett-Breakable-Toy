import React from 'react'
import * as Tone from 'tone'

const MicEchoInsert = ({mic, recorder}) => {
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.25).connect(recorder).toDestination();

  const onEcho = (event) => {
    event.preventDefault()
    mic.connect(feedbackDelay)
  }

  const noEcho = (event) => {
    event.preventDefault()
    mic.disconnect(feedbackDelay)
  }
 
  return(
    <section>
      <h6>Echo:<br/>
        <input type="submit" onClick={onEcho} value="0)))"/>
        <input type="submit" onClick={noEcho} value="0"/>
      </h6>
    </section>
  )

}
export default MicEchoInsert