
import React,{ useState } from 'react';
import FileData from "./FileData"
 
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
          const body = await response.json();
          setShouldRedirect(true)
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    };

    if (shouldRedirect) {
      location.href = "/profile";
    }
      
    return (
      <div>
          <h3>File Upload</h3>
          <h4>Only .mp3 or .wav files are allowed!</h4>
          <form onSubmit={onFileUpload} encType="multipart/form-data">
              <input type="file" onChange={onFileChange} />
              <input type="submit" value="Upload"/>
          </form>
        <FileData selectedFile={selectedFile}/>
      </div>
    );
  }
  
 
  export default Uploader;