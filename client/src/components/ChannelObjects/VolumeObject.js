import React from 'react'
import PlayerObject from "./PlayerObject.js"
import * as Tone from 'tone'

const VolumeObject = () => {
  const playerObject = PlayerObject()
  const player = playerObject.effect

  const volumeUp = (event) => {
    event.preventDefault()
    player.volume.value += 5
  }

  const volumeDown = (event) => {
    event.preventDefault()
    player.volume.value -= 5
  }

  const symbol1 = "<)))"
  const symbol2 = "<"


  return{
    effectName: "Volume:",
    effect: "",
    handleClick1: volumeUp,
    handleClick2: volumeDown,
    symbol1: symbol1,
    symbol2: symbol2
  }
}
export default VolumeObject