import React, {useState, useEffect} from "react";
import { withRouter } from "react-router";
import UserAudioTile from "./UserAudioTile"
import getCurrentUser from "./../services/getCurrentUser.js"

const UserProfile = (props) => {

  // useEffect(() => {
 
  // }, []);
  
  const currentUser = props.user
  const [user, setUser] = useState(currentUser)
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
    if (!user) {
      getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
      });
    } else {
      getAudio(user)
    }
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
    <div className="main">
      <h1>your audio projects:</h1>
      <ul>{mappedAudio}</ul>
    </div>
  )
}

export default UserProfile;