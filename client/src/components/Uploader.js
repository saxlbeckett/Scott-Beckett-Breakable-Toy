
import React,{ useState } from 'react';
import FileData from "./FileData"
 
const Uploader = (props) => {

    const [selectedFile, setSelectedFile] = useState({})
    
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
        const response = await fetch(`/api/v1/upload`, {
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
          const body = await response.json();
          alert("Upload succesfull")
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
      }
    };

      
    return (
      <div>
          <h3>
            File Upload
          </h3>
          <form onSubmit={onFileUpload} encType="multipart/form-data">
              <input type="file" onChange={onFileChange} />
              <input type="submit" value="Upload"/>
          </form>
        <FileData selectedFile={selectedFile}/>
      </div>
    );
  }
  
 
  export default Uploader;