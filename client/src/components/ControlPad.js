import React, { useState } from 'react'
import * as Tone from 'tone'


const ControlPad = (props) => {
  const actx = new Tone.Context();
  const recorder = new Tone.Recorder();
  const sampler = new Tone.Sampler({
    urls: {A1: "414208__jacksonacademyashmore__airhorn.wav"},
    baseUrl: "https://audiofilestorage2.s3.amazonaws.com/",
    onload: () => {
      console.log("sample loaded");
    }
  }).connect(recorder).toDestination();
  const player = new Tone.Player(`${props.track.audioFilePath}`).connect(recorder).toDestination();
  const chorus = new Tone.Chorus(100, 30, 1).connect(recorder).toDestination();
  const pingPong = new Tone.PingPongDelay(0.50 , 0.25).connect(recorder).toDestination();
  const pitchShift = new Tone.PitchShift(-12).connect(recorder).toDestination();
  const crusher = new Tone.BitCrusher(4).connect(recorder).toDestination();
  
  const mic = new Tone.UserMedia().connect(recorder).toDestination();
  const reverb = new Tone.Reverb(5).connect(recorder).toDestination();
  const harmonizer = new Tone.PitchShift(5).connect(recorder).toDestination();
  const voiceShift = new Tone.PitchShift(-8).connect(recorder).toDestination();
  const feedbackDelay = new Tone.FeedbackDelay("8n", 0.25).connect(recorder).toDestination();
  //Track functions
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
  const airHorn = (event) => {
    event.preventDefault()
    sampler.triggerAttack(["A1"])
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

  const record = (event) => {
    alert("Play your track and start singing!")
    recorder.start();
  }

  const stopRecord = (event) => {
    // wait for the notes to end and stop the recording
    alert("Recording stopped, your performance is being downloded")
    setTimeout(async () => {
      // the recorded audio is returned as a blob
      const recording = await recorder.stop();
      // download the recording by creating an anchor element and blob url
      const url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "recording.webm";
      anchor.href = url;
      anchor.click();
    }, 2000);   

  } 
   
  return(
    <div>
      <section><h3>Track controls:</h3>
        <h4> <input type="submit" onClick={play} value="Play"/>
        <input type="submit" onClick={stop} value="Stop"/></h4>
        <h4> <input type="submit" onClick={speedUp} value="Speed+"/>
        <input type="submit" onClick={speedDown} value="Speed-"/></h4>
        <h4> <input type="submit" onClick={reverse} value="Reverse"/>
        <input type="submit" onClick={forward} value="Forward"/></h4>
        <h5><input type="submit" onClick={onChorus} value="Chorus On"/>
        <input type="submit" onClick={noChorus} value="Chorus off"/></h5>
        <h5><input type="submit" onClick={onPing} value="Ping Pong On"/>
        <input type="submit" onClick={noPing} value="Ping Pong off"/></h5>
        <h5><input type="submit" onClick={onPitch} value="Pitch shift On"/>
        <input type="submit" onClick={noPitch} value="Pitch shift off"/></h5>
        <h5><input type="submit" onClick={bitCrush} value="Bit Crusher On"/>
        <input type="submit" onClick={noCrush} value="Bit Crusher off"/></h5>
        <h5><input type="submit" onClick={airHorn} value="Airhorn"/></h5>
      </section>
      <section><h3>Mic Controls</h3>
        <h5>Put on headphones before starting mic <br/> to prevent feedback!</h5>
        <h4> <input type="submit" onClick={micOn} value="Mic On"/>
        <input type="submit" onClick={micOff} value="Mic Off"/></h4>
        <h5><input type="submit" onClick={onReverb} value="Reverb On"/>
        <input type="submit" onClick={noReverb} value="Reverb off"/></h5>
        <h5><input type="submit" onClick={onHarmonize} value="Harmonizer On"/>
        <input type="submit" onClick={noHarmonize} value="Harmonizer off"/></h5>
        <h5><input type="submit" onClick={onVoxShift} value="Pitch Shifter On"/>
        <input type="submit" onClick={noVoxShift} value="Pitch Shifter off"/></h5>
        <h5><input type="submit" onClick={onEcho} value="Echo On"/>
        <input type="submit" onClick={noEcho} value="Echo off"/></h5>
      </section>
      <section><h3>Recording controls:</h3>
        <h4><input type="submit" onClick={record} value="Start Recording"/>
        <input type="submit" onClick={stopRecord} value="Stop Recording"/></h4>
      </section>
      
    </div>
  )
}
export default ControlPad