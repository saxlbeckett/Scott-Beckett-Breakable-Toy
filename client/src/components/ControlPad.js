import React from 'react'


const ControlPad = (props) => {

  return(
    <div>
      <audio
        controls
        src={props.track.audioFilePath}>
            Your browser does not support the
            <code>audio</code> element.
      </audio>
    </div>
  )
}
export default ControlPad