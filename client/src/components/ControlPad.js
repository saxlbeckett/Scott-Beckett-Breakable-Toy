import React, { useState } from 'react'
import * as Tone from 'tone'
import RecorderObject from "./ChannelObjects/RecorderObject.js"
import ChannelInsert from "./ChannelInsert.js"

const ControlPad = (props) => {
  const actx = new Tone.Context();
  Tone.Transport.start();

  const recorderObject = RecorderObject()
  const recorder = recorderObject.effect

  const player = new Tone.Player(`${props.track.audioFilePath}`).connect(recorder).toDestination();
  player.volume.value = -10
  const sampler = new Tone.Sampler({
    urls: {A1: "414208__jacksonacademyashmore__airhorn.wav"},
    baseUrl: "https://audiofilestorage2.s3.amazonaws.com/",
    onload: () => {
      console.log("sample loaded");
    }
  }).connect(recorder).toDestination();

  const synth = new Tone.MembraneSynth().connect(recorder).toDestination();
  
  const chorus = new Tone.Chorus(100, 30, 1).connect(recorder).toDestination();
  const pingPong = new Tone.PingPongDelay(0.50 , 0.25).connect(recorder).toDestination();
  const pitchShift = new Tone.PitchShift(-12).connect(recorder).toDestination();
  const crusher = new Tone.BitCrusher(4).connect(recorder).toDestination();
  
  const mic = new Tone.UserMedia().connect(recorder).toDestination();
  const reverb = new Tone.Reverb(5).connect(recorder).toDestination();
  const trackReverb = new Tone.Reverb(5).connect(recorder).toDestination();
  const harmonizer = new Tone.PitchShift(5).connect(recorder).toDestination();
  const voiceShift = new Tone.PitchShift(-8).connect(recorder).toDestination();
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.25).connect(recorder).toDestination();

  const play = (event) => {
    Tone.loaded().then(()=> {
      player.start();
    });
  }

  const stop = (event) => {
    event.preventDefault()
    player.stop()
  }

  const onTrackReverb = (event) => {
    event.preventDefault()
    player.connect(trackReverb)
  }

  const noTrackReverb = (event) => {
    event.preventDefault()
    player.disconnect(trackReverb)
  }

  const volumeUp = (event) => {
    event.preventDefault()
    player.volume.value += 5
  }

  const volumeDown = (event) => {
    event.preventDefault()
    player.volume.value -= 5
  }

  const onLoop = (event) => {
    event.preventDefault()
    player.loop = true
  }

  const noLoop = (event) => {
    event.preventDefault()
    player.loop = false
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

  const airHorn = (event) => {
    event.preventDefault()
    sampler.triggerAttack(["A1"])
  }

  const bassDrum = (event) => {
    event.preventDefault()
    synth.triggerAttackRelease("C2", "8n");
  }

  const speedUp = (event) => {
    event.preventDefault()
    player.playbackRate += 0.25
  }

  const speedDown = (event) => {
    event.preventDefault()
    player.playbackRate -= 0.25
  }

  const reverse = (event) => {
    event.preventDefault()
    player.reverse = true
  }

  const forward = (event) => {
    event.preventDefault()
    player.reverse = false
  }

  //Mic controls
  const micOn = (event) => {
    Tone.start()
    mic.open()
    alert("Mic open")
  }

  const micOff = (event) => {
    mic.close()
    alert("Mic closed")
  }

  const onReverb = (event) => {
    event.preventDefault()
    mic.connect(reverb)
  }

  const noReverb = (event) => {
    event.preventDefault()
    mic.disconnect(reverb)
  }

  const onHarmonize = (event) => {
    event.preventDefault()
    mic.connect(harmonizer)
  }

  const noHarmonize = (event) => {
    event.preventDefault()
    mic.disconnect(harmonizer)
  }

  const onVoxShift = (event) => {
    event.preventDefault()
    mic.connect(voiceShift)
  }

  const noVoxShift = (event) => {
    event.preventDefault()
    mic.disconnect(voiceShift)
  }

  const onEcho = (event) => {
    event.preventDefault()
    mic.connect(feedbackDelay)
  }

  const noEcho = (event) => {
    event.preventDefault()
    mic.disconnect(feedbackDelay)
  }

   
  return(
    <div className="audioTile">
      <h3>Control Pad:</h3>
      <h6>Record over your uploaded track or record a new track to upload!</h6>
      <section><h4>{recorderObject.effectName}</h4>
        <ChannelInsert effectName="" handleClick1={recorderObject.handleClick1} handleClick2={recorderObject.handleClick2} symbol1={recorderObject.symbol1} symbol2={recorderObject.symbol2} />
      </section>
      <section><h4>Track controls:</h4>
      <ChannelInsert effectName="Play/Stop:" handleClick1={play} handleClick2={stop} symbol1=">" symbol2="X"/>
      </section>
          <ChannelInsert effectName="Volume:" handleClick1={volumeUp} handleClick2={volumeDown} symbol1="<)))" symbol2="<"/>
          <section>
            <h6>Loop:<br/>
              <input type="submit" onClick={onLoop} value="@"/>
              <input type="submit" onClick={noLoop} value="x"/>
            </h6>
          </section>
       <section> 
         <h6>
           Speed:<br/>
            <input type="submit" onClick={speedUp} value="+"/>
            <input type="submit" onClick={speedDown} value="-"/>
          </h6>
          <h6>
            Direction:<br/>
            <input type="submit" onClick={reverse} value="<<"/>
            <input type="submit" onClick={forward} value=">>"/>
          </h6>
        </section>
          <section>
            <h6>Track Reverb:<br/>
              <input type="submit" onClick={onTrackReverb} value=">O<"/>
              <input type="submit" onClick={noTrackReverb} value="O"/>
            </h6>
          </section>
          <section>
            <h6>Chorus:<br/>
              <input type="submit" onClick={onChorus} value="||"/>
              <input type="submit" onClick={noChorus} value="|"/>
            </h6>
          </section>
          <section>
            <h6>Delay:<br/>
              <input type="submit" onClick={onPing} value="O)))"/>
              <input type="submit" onClick={noPing} value="O"/>
            </h6>
          </section>
          <section>
            <h6>Pitch:<br/>
              <input type="submit" onClick={onPitch} value="V"/>
              <input type="submit" onClick={noPitch} value="-"/>
            </h6>
          </section>
          <section>
            <h6>Crusher:<br/>
              <input type="submit" onClick={bitCrush} value="xXx"/>
              <input type="submit" onClick={noCrush} value="oOo"/>
            </h6>
          </section>
          <section>
            <h6>Airhorn:<br/> 
              <input type="submit" onClick={airHorn} value="<o))"/>
            </h6>
          </section>
          <section>
            <h6>Bass Drum:<br/>
              <input type="submit" onClick={bassDrum} value="((X))"/>
            </h6>
          </section>
          <section ><h4>Mic Controls:</h4>
            <h6>Put on headphones before starting mic <br/> to prevent feedback!</h6>
            <h6>Mic:<br/>
              <input type="submit" onClick={micOn} value="O"/>
              <input type="submit" onClick={micOff} value="X"/>
            </h6>
          </section>
          <section>
            <h6>Reverb:<br/>
              <input type="submit" onClick={onReverb} value="((0))"/>
              <input type="submit" onClick={noReverb} value="0"/>
            </h6>
          </section>
          <section>
            <h6>Harmonize:<br/>
              <input type="submit" onClick={onHarmonize} value="+O+"/>
              <input type="submit" onClick={noHarmonize} value="O"/>
            </h6>
          </section>
          <section>
            <h6>Pitch:<br/>
              <input type="submit" onClick={onVoxShift} value="vOv"/>
              <input type="submit" onClick={noVoxShift} value="-o-"/>
            </h6>
          </section>
          <section>
            <h6>Echo:<br/>
              <input type="submit" onClick={onEcho} value="O)))"/>
              <input type="submit" onClick={noEcho} value="O"/>
            </h6>
          </section>
    </div>
  )
}
export default ControlPad