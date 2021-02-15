
import React,{ useState } from 'react';
import FileData from "./FileData"
import { Redirect } from 'react-router-dom'
 
const Uploader = (props) => {

    const [selectedFile, setSelectedFile] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false)
    
    // On file select (from the pop up)
    const onFileChange = (event) => {
      // Update the state
      setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = (event) => {
      event.preventDefault()
      postAudio()
    }

    const postAudio = async () => {
      let formData = new FormData()
      formData.append("audio", selectedFile)
      
      try {
        const response = await fetch(`/api/v1/audio`, {
          method: "POST",
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
          alert("Upload succesfull")
          setShouldRedirect(true)
          const body = await response.json();
          
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
          <h5>File Upload</h5>
          <h6>Only .mp3 or .webm files are allowed!</h6>
          <form onSubmit={onFileUpload} encType="multipart/form-data">
              <input className="uploader" type="file" onChange={onFileChange} />
              <input type="submit" value="Upload"/>
          </form>
        <FileData selectedFile={selectedFile}/>
      </div>
    );
  }
  
 
  export default Uploader;