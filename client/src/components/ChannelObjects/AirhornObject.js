import React from 'react'
import * as Tone from 'tone'
import RecorderObject from "./RecorderObject.js"
import PlayerObject from "./PlayerObject.js"

const AirhornObject = () => {
  const recorderObject = RecorderObject()
  const recorder = recorderObject.effect

  const sampler = new Tone.Sampler({
    urls: {A1: "414208__jacksonacademyashmore__airhorn.wav"},
    baseUrl: "https://audiofilestorage2.s3.amazonaws.com/",
    onload: () => {
      console.log("sample loaded");
    }
  }).connect(recorder).toDestination();

  const airHorn = (event) => {
    event.preventDefault()
    sampler.triggerAttack(["A1"])
  }

  const symbol1 = "<o)))"

  return {
    effectName: "Airhorn:",
    effect: sampler,
    handleClick1: airHorn,
    handleClick2: "",
    symbol1: symbol1,
    symbol2: ""
  }
}
export default AirhornObject