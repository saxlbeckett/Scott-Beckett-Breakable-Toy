import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors";
import ControlPad from "./ControlPad"

const AudioShowPage = (props) => {
  const [errors, setErrors] = useState({});
  const [track, setTrack] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const getTrack = async () => {
    const trackId = props.match.params.id
    try {
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


  const deleteTrack = async (track) => {
    try {
      const trackId = track.id;
      const response = await fetch(`/api/v1/audio/${trackId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      }
      const body = await response.json();
      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };


  const updateTrack = async (track) => {
    let formData = new FormData()
    formData.append("audio", selectedFile)
    //formData.append("effect")
    try {
      const trackId = track.id;
      const response = await fetch(`/api/v1/reviews/${trackId}`, {
        method: "PATCH",
        body: formData,
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        debugger;
        setTrack(body.track);
        setErrors({});
        return;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let loggedInUser;
  if (props.user == undefined) {
    loggedInUser = { email: "guest" };
  } else {
    loggedInUser = props.user;
  }

  if (shouldRedirect) {
    return <Redirect to= "/profile"/>;
  }

  return (
    <div>
      <h2>{track.name}</h2>
      <h3>Update and delete methods will be passed in as props</h3>
      <ControlPad track={track} deleteTrack={deleteTrack} updateTrack={updateTrack}/>
    </div>
  );
};

export default withRouter(AudioShowPage);