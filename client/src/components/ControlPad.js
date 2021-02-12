import React, { useState } from 'react'
import * as Tone from 'tone'

const ControlPad = (props) => {

  
  const player = new Tone.Player(`${props.track.audioFilePath}`).toDestination();
  const chorus = new Tone.Chorus(100, 30, 1).toDestination();
  const pingPong = new Tone.PingPongDelay(0.50 , 0.25).toDestination();
  const pitchShift = new Tone.PitchShift(-12).toDestination();
  const crusher = new Tone.BitCrusher(4).toDestination();
  
  const play = (event) => {
      Tone.loaded().then(()=> {
        player.start();
      });
  }
  
  const stop = (event) => {
    player.stop()
  }

  const bitCrush = (event) => {
    event.preventDefault()
    player.connect(crusher)
  }
  const noCrush = (event) => {
    event.preventDefault()
    player.disconnect(crusher)
  }
  const onChorus = (event) => {
    event.preventDefault()
    player.connect(chorus)
  }
  const noChorus = (event) => {
    event.preventDefault()
    player.disconnect(chorus)
  }
  const onPing = (event) => {
    event.preventDefault()
    player.connect(pingPong)
  }
  const noPing = (event) => {
    event.preventDefault()
    player.disconnect(pingPong)
  }
  const onPitch = (event) => {
    event.preventDefault()
    player.connect(pitchShift)
  }
  const noPitch = (event) => {
    event.preventDefault()
    player.disconnect(pitchShift)
  }
   
  return(
    <div>
      <h4> <input type="submit" onClick={play} value="Play"/>
      <input type="submit" onClick={stop} value="Stop"/></h4>

      <h5><input type="submit" onClick={onChorus} value="Chorus On"/>
      <input type="submit" onClick={noChorus} value="Chorus off"/></h5>

      <h5><input type="submit" onClick={onPing} value="Ping Pong On"/>
      <input type="submit" onClick={noPing} value="Ping Pong off"/></h5>

      <h5><input type="submit" onClick={onPitch} value="Pitch shift On"/>
      <input type="submit" onClick={noPitch} value="Pitch shift off"/></h5>

      <h5><input type="submit" onClick={bitCrush} value="Bit Crusher On"/>
      <input type="submit" onClick={noCrush} value="Bit Crusher off"/></h5>

    </div>
  )
}
export default ControlPad