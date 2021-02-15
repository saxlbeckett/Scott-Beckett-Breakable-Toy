import React from "react"
import { Link } from 'react-router-dom'
const UserAudioTile = (props) => {
  return(
    <div className="audioTile">
      <h3>{props.file.name}</h3>
      <h3>{props.file.type}</h3>
      <h3>User # {props.file.user.email}</h3>
      <Link to={`/audio/${props.file.id}`}><h4>Click here to create with your track</h4></Link>
      <audio
        controls
        src={props.file.audioFilePath} >
            Your browser does not support the
            <code>audio</code> element.
      </audio>
    </div>
  )
}
export default UserAudioTile