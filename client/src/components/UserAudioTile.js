import React from "react"
import { Link } from 'react-router-dom'
const AudioTile = (props) => {
  return(
    <div>
      
      <h5>{props.file.name}</h5>
      <h5>{props.file.type}</h5>
      <h5>User # {props.file.user.email}</h5>
      <Link to={`/audio/${props.file.id}`}><h4>Click here to create with your track</h4></Link>
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