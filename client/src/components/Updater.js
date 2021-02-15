
import React,{ useState } from 'react';
import FileData from "./FileData"

 
const Updater = (props) => {

    const [selectedFile, setSelectedFile] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false)
    
    // On file select (from the pop up)
    const onFileChange = (event) => {
      // Update the state
      setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = (event) => {
      event.preventDefault()
      let confirm = prompt("Please confirm by typing 'Y' or 'y'")
      if(confirm === 'Y' || confirm === 'y'){
        patchAudio()
      } else {
        alert("Track was not updated!")
        setSelectedFile({})
      }
      
    }

    const patchAudio = async () => {
      let trackId = props.trackId
      let formData = new FormData()
      formData.append("audio", selectedFile)
      
      try {
        const response = await fetch(`/api/v1/audio/${trackId}`, {
          method: "PATCH",
          credentials: "same-origin",
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
          console.log(body.update)
          alert("Update succesfull")
          setShouldRedirect(true)
         
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    };
    if (shouldRedirect) {
      location.href="/"
    }
      
    return (
      <div className="audioTile">
          <h5>Overwrite the existing track with you new track?</h5>
          <h6>Only mp3 or .webm files are allowed</h6>
          <form onSubmit={onFileUpload} encType="multipart/form-data">
              <input type="file" onChange={onFileChange}/><br/>
              <input type="submit" value="Update"/>
          </form>
        <FileData selectedFile={selectedFile}/>
      </div>
    );
  }
  
 
  export default Updater;