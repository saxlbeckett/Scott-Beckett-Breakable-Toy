import React, {useState} from 'react'
import * as Tone from 'tone'

import BitCrusherInsert from './TrackEffectInserts/BitCrusherInsert.js'
import ChorusInsert from './TrackEffectInserts/ChorusInsert.js'
import DelayInsert from './TrackEffectInserts/DelayInsert.js'
import DirectionInsert from './TrackControls/DirectionInsert.js'
import LoopInsert from "./TrackControls/LoopInsert.js"
import MicSwitchInsert from './MicControls/MicSwitchInsert.js'
import MicReverbInsert from './MicControls/MicReverbInsert.js'
import MicHarmonizeInsert from './MicControls/MicHarmonizeInsert.js'
import MicVoxShiftInsert from './MicControls/MicVoxShiftInsert.js'
import MicEchoInsert from './MicControls/MicEchoInsert.js'
import PitchShiftInsert from './TrackEffectInserts/PitchShiftInsert.js'
import PlayerInsert from "./TrackControls/PlayerInsert.js"
import RecorderInsert from "./TrackControls/RecorderInsert.js"
import SamplerInsert from "./TrackEffectInserts/SamplerInsert.js"
import SpeedInsert from './TrackControls/SpeedInsert.js'
import TrackReverbInsert from './TrackEffectInserts/TrackReverbInsert.js'
import VolumeInsert from "./TrackControls/VolumeInsert.js"

const ControlPad = (props) => {
  Tone.Transport.start();

  const recorder = new Tone.Recorder();

  const player = new Tone.Player(`${props.track.audioFilePath}`).connect(recorder).toDestination();
  player.volume.value = -10

  const mic = new Tone.UserMedia().connect(recorder).toDestination();

  const [trackControls, setTrackControls] = useState(false)
  const clickTrackControls = (event) => {
    setTrackControls(!trackControls)
  }
  let trackPanel
  if(trackControls === false){
     trackPanel = <h6>^^^</h6>;
  } else {
    trackPanel = <section>
          <PlayerInsert player={player}/>
          <VolumeInsert player={player}/>
          <LoopInsert player={player} />
          <SpeedInsert player={player}/>
          <DirectionInsert player={player}/>
      </section>;
  }

  const [trackEffects, setTrackEffects] = useState(false)
  const clickTrackEffects = (event) => {
    setTrackEffects(!trackEffects)
  }
  let trackEffectsPanel
  if(trackEffects === false){
     trackEffectsPanel = <h6>^^^</h6>;
  } else {
    trackEffectsPanel = <section>
        <TrackReverbInsert player={player} recorder={recorder} />
        <ChorusInsert player={player} recorder={recorder}/>
        <DelayInsert player={player} recorder={recorder}/>
        <PitchShiftInsert player={player} recorder={recorder}/>
        <BitCrusherInsert player={player} recorder={recorder}/>
        <SamplerInsert recorder={recorder}/>
      </section>;
  }

  const [micEffects, setMicEffects] = useState(false)
  const clickMicEffects = (event) => {
    setMicEffects(!micEffects)
  }
  let micEffectsPanel
  if(micEffects === false){
     micEffectsPanel = <h6>^^^</h6>;
  } else {
    micEffectsPanel = <section>
        <h6>Put on headphones before starting mic <br/> to prevent feedback!</h6>
        <MicSwitchInsert mic={mic}/>
        <MicReverbInsert mic={mic} recorder={recorder}/>
        <MicHarmonizeInsert mic={mic} recorder={recorder}/>
        <MicVoxShiftInsert mic={mic} recorder={recorder}/>
        <MicEchoInsert mic={mic} recorder={recorder}/>
      </section>;
  }

  const [recEffects, setRecEffects] = useState(false)
  const clickRecEffects = (event) => {
    setRecEffects(!recEffects)
  }
  let recEffectsPanel
  if(recEffects === false){
     recEffectsPanel = <h6>^^^</h6>;
  } else {
    recEffectsPanel = <section>
        <RecorderInsert recorder={recorder}/>
      </section>;
  }

  return(
    <div className="audioTile">
      <h3>Control Pad:</h3>
      <h6>Record over your uploaded track or record a new track to upload!</h6>
      <section><a><h4 onClick={clickRecEffects}>Recording Controls:</h4></a>
        {recEffectsPanel}
      </section>
        <section><a><h4 onClick={clickTrackControls} >Track controls:</h4></a>
          {trackPanel}
        </section>
        <section><a><h4 onClick={clickTrackEffects} >Track Effects:</h4></a> 
          {trackEffectsPanel}
        </section>
        <section ><a><h4 onClick={clickMicEffects}>Mic Controls:</h4></a>
          {micEffectsPanel}
        </section>
    </div>
  )
}
export default ControlPad