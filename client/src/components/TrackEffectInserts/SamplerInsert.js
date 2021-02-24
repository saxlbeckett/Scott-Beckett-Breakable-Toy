import React from 'react'
import * as Tone from 'tone'

const SamplerInsert = ({recorder}) => {

  const sampler = new Tone.Sampler({
    urls: {A1: "414208__jacksonacademyashmore__airhorn.wav"},
    baseUrl: "https://audiofilestorage2.s3.amazonaws.com/",
    onload: () => {
      console.log("sample loaded");
    }
  }).connect(recorder).toDestination();

  const synth = new Tone.MembraneSynth().connect(recorder).toDestination();

  const airHorn = (event) => {
    event.preventDefault()
    sampler.triggerAttack(["A1"])
  }

  const bassDrum = (event) => {
    event.preventDefault()
    synth.triggerAttackRelease("C2", "8n");
  }

  return(
    <section>
      <h6>Airhorn:<br/> 
        <input type="submit" onClick={airHorn} value="<o))"/>
      </h6>
      <h6>Bass Drum:<br/>
        <input type="submit" onClick={bassDrum} value="((X))"/>
      </h6>
    </section>
  )

}
export default SamplerInsert