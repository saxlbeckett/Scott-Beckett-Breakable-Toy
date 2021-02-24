import React, { useState } from 'react'
import * as Tone from 'tone'
import RecorderInsert from "./TrackControls/RecorderInsert.js"
import PlayerInsert from "./TrackControls/PlayerInsert.js"
import VolumeInsert from "./TrackControls/VolumeInsert.js"
import LoopInsert from "./TrackControls/LoopInsert.js"
import SpeedInsert from './TrackControls/SpeedInsert.js'
import DirectionInsert from './TrackControls/DirectionInsert.js'
import TrackReverbInsert from './TrackEffectInserts/TrackReverbInsert.js'
import ChorusInsert from './TrackEffectInserts/ChorusInsert.js'
import DelayInsert from './TrackEffectInserts/DelayInsert.js'
import PitchShiftInsert from './TrackEffectInserts/PitchShiftInsert.js'
import BitCrusherInsert from './TrackEffectInserts/BitCrusherInsert.js'
import SamplerInsert from "./TrackEffectInserts/SamplerInsert.js"

const ControlPad = (props) => {
  const actx = new Tone.Context();
  Tone.Transport.start();

  const recorder = new Tone.Recorder();

  const player = new Tone.Player(`${props.track.audioFilePath}`).connect(recorder).toDestination();
  player.volume.value = -10

  const mic = new Tone.UserMedia().connect(recorder).toDestination();
  const reverb = new Tone.Reverb(5).connect(recorder).toDestination();
  const harmonizer = new Tone.PitchShift(5).connect(recorder).toDestination();
  const voiceShift = new Tone.PitchShift(-8).connect(recorder).toDestination();
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.25).connect(recorder).toDestination();

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
      <section><h4>Recording Controls:</h4>
        <RecorderInsert recorder={recorder}/>
      </section>
        <section><h4>Track controls:</h4>
          <PlayerInsert player={player}/>
          <VolumeInsert player={player}/>
          <LoopInsert player={player} />
          <SpeedInsert player={player}/>
          <DirectionInsert player={player}/>
        </section>
        <section><h4>Track Effects:</h4> 
          <TrackReverbInsert player={player} recorder={recorder} />
          <ChorusInsert player={player} recorder={recorder}/>
          <DelayInsert player={player} recorder={recorder}/>
          <PitchShiftInsert player={player} recorder={recorder}/>
          <BitCrusherInsert player={player} recorder={recorder}/>
          <SamplerInsert recorder={recorder}/>
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