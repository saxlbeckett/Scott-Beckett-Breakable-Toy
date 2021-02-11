import React from "react"
import { Link } from 'react-router-dom'
const AudioTile = (props) => {

  return(
    <div>
      <Link to={`/audio/${props.file.id}`}></Link><h5>{props.file.name}</h5>
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