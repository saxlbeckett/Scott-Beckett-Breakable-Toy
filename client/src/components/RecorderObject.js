import React, { useState } from 'react'
import * as Tone from 'tone'

const RecorderObject = () => {

  const recorder = new Tone.Recorder();

  const record = (event) => {
    alert("Now you can start your mic and start you track and cut a demo!")
    recorder.start();
  }

  const stopRecord = (event) => {
    // wait for the notes to end and stop the recording
    alert("Recording stopped, your performance is being downloded")
    setTimeout(async () => {
      // the recorded audio is returned as a blob
      try{
        const recording = await recorder.stop();
        // download the recording by creating an anchor element and blob url
        const url = URL.createObjectURL(recording);
        const anchor = document.createElement("a");
        anchor.download = "recording.webm";
        anchor.href = url;
        anchor.click();
      } catch(error){
        alert(error)
      }
    }, 2000);   
  }

  const symbol1 = "Start"
  const symbol2 = "Stop"

  return {
    effectName: "Recording controls:",
    effect: recorder,
    handleClick1: record,
    handleClick2: stopRecord,
    symbol1: symbol1,
    symbol2: symbol2
  }

}
export default RecorderObject