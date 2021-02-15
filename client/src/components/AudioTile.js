import React from "react"
const AudioTile = (props) => {

  return(
    <div className="audioTile">
      <h3>{props.file.name}</h3>
      <h3>{props.file.type}</h3>
      <h3>User # {props.file.user.email}</h3>
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