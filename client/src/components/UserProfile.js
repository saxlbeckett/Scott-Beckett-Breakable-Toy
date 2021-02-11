import React, {useState, useEffect} from "react";
import { withRouter } from "react-router";
import UserAudioTile from "./UserAudioTile"
import getCurrentUser from "../services/getCurrentUser"

const UserProfile = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const [audioFiles, setAudioFiles] = useState([]);
  const getAudio = async (user) => {
    try {
      const response = await fetch(`/api/v1/users/${user.id}`);
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
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        getAudio(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

    
  let userName = "";
  if (currentUser !== undefined && currentUser !== null) {
    userName += currentUser.email;
  }

  const mappedAudio = audioFiles.map((file) => {
    return(
      <UserAudioTile file={file} />
    )
  })
  
  return(
    <div>
      <h1>Your audio projects {userName}</h1>
      <ul>{mappedAudio}</ul>
    </div>
  )
}

export default withRouter(UserProfile);