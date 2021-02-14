import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors";
import ControlPad from "./ControlPad"
import Deleter from "./Deleter"
import Updater from "./Updater"

const AudioShowPage = (props) => {
  const [errors, setErrors] = useState({});
  const [track, setTrack] = useState({});

  const getTrack = async () => {
    const trackId = props.match.params.id
    try{
      const response = await fetch(`/api/v1/audio/${trackId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      console.log(body)
      setTrack(body.track);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getTrack();
  }, []);


  let loggedInUser;
  if (props.user == undefined) {
    loggedInUser = { email: "guest" };
  } else {
    loggedInUser = props.user;
  }

  return (
    <div>
      <h2>{track.name}</h2>
      <h3>Control Pad:</h3>
      <ControlPad track={track} />
      <Updater trackId={track.id}/>
      <Deleter trackId={track.id}/>
    </div>
  );
};

export default withRouter(AudioShowPage);