
import React,{ useState } from 'react';
import FileData from "./FileData"

const Deleter = (props) => {

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const trackId = props.trackId
  const deleteTrack = async () => {
    try {
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
      alert(body.message)
      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  if (shouldRedirect) {
    location.href="/"
  }

  const onDelete = (event) => {
    event.preventDefault()
    let confirm = prompt("Please confirm by typing 'Y' or 'y'")
    if(confirm === 'Y' || confirm === 'y'){
      deleteTrack()
    } else {
      alert("Track was not deleted!")
    }

  }

  return (
    <div>
      <h5>Delete your track</h5>
      <form onSubmit={onDelete} encType="multipart/form-data">
          <h3><input type="submit" value="Delete"/></h3>
      </form>
    </div>

  )
}
export default Deleter
