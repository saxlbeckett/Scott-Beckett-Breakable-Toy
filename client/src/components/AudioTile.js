import React from "react"

const AudioTile = (props) => {

  return(
    <div>
      <h5>{props.file.name}</h5> //Make this into a LINK!
      <h5>{props.file.type}</h5>
      <h5>User # {props.file.user.email}</h5>
      <audio
        controls
        src={props.file.audioFilePath}>
            Your browser does not support the
            <code>audio</code> element.
      </audio>
    </div>
  )
}
export default AudioTile