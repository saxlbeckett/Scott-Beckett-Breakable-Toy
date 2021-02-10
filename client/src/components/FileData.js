import React from 'react'

const FileData = (props) => {
    
    if (props.selectedFile) {
       
      return (
        <div>
          <h2>File Details:</h2>
           
            <p>File Name: {props.selectedFile.name}</p>
      
            <p>File Type: {props.selectedFile.type}</p>

            <p>Last Modified: {props.selectedFile.lastModified}</p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  export default FileData