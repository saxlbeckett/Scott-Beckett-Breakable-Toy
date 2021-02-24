import React from 'react'

const RecorderInsert = ({recorder}) => {

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

  return(
    <section>
      <h6>
        <input type="submit" onClick={record} value="Start"/>
        <input type="submit" onClick={stopRecord} value="Stop"/>
      </h6>
    </section>
  )

}
export default RecorderInsert