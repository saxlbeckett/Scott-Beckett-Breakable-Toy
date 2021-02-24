import React from 'react'
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
          <MicSwitchInsert mic={mic}/>
          <MicReverbInsert mic={mic} recorder={recorder}/>
          <MicHarmonizeInsert mic={mic} recorder={recorder}/>
          <MicVoxShiftInsert mic={mic} recorder={recorder}/>
          <MicEchoInsert mic={mic} recorder={recorder}/>
        </section>
    </div>
  )
}
export default ControlPad