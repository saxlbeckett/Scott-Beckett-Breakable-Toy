import React from 'react'
import * as Tone from 'tone'

const PlayerInsert = ({player}) => {
  
  const play = (event) => {
    Tone.loaded().then(()=> {
      player.start();
    });
  }

  const stop = (event) => {
    event.preventDefault()
    player.stop()
  }

  return(
    <section>
      <h6>Play/Stop:<br/>
        <input type="submit" onClick={play} value=">"/>
        <input type="submit" onClick={stop} value="X"/>
      </h6>
    </section>
  )

}
export default PlayerInsert