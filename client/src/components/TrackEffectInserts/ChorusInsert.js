import React from 'react'
import * as Tone from 'tone'

const ChorusInsert = ({recorder, player}) => {
  const chorus = new Tone.Chorus(100, 30, 1).connect(recorder).toDestination();

  const onChorus = (event) => {
    event.preventDefault()
    player.connect(chorus)
  }

  const noChorus = (event) => {
    event.preventDefault()
    player.disconnect(chorus)
  }

  return(
    <section>
      <h6>Chorus: <br/>
        <input type="submit" onClick={onChorus} value="||"/>
        <input type="submit" onClick={noChorus} value="|"/>
      </h6>
    </section>
  )

}
export default ChorusInsert