import React from 'react'
import * as Tone from 'tone'
//this component is not currently operational
const PlayerObject = (audioFilePath) => {

  const player = new Tone.Player(`${audioFilePath}`)

  const play = (event) => {
    Tone.loaded().then(()=> {
      player.start();
    });
  }

  const stop = (event) => {
    event.preventDefault()
    player.stop()
  }

  const symbol1 = ">"
  const symbol2 = "X"


  return {
    effectName: "Play/Stop:",
    effect: player,
    handleClick1: play,
    handleClick2: stop,
    symbol1: symbol1,
    symbol2: symbol2
  }
}
export default PlayerObject