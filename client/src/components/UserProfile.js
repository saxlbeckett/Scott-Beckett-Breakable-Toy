import React, {useState, useEffect} from "react";
import { withRouter } from "react-router";
import UserAudioTile from "./UserAudioTile"

const UserProfile = (props) => {
  let userName = "";
  if (props.user !== undefined && props.user !== null) {
    userName += props.user.email;
  }

  const [audioFiles, setAudioFiles] = useState([]);
  const getAudio = async () => {

    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setAudioFiles(body.userAudio);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getAudio();
  }, []);
  
  const mappedAudio = audioFiles.map((file) => {
    return(
      <UserAudioTile file={file} />
    )
  })
  
  return(
    <div>
      <h1>Your audio projects</h1>
      <ul>{mappedAudio}</ul>
    </div>
  )
}

export default withRouter(UserProfile);