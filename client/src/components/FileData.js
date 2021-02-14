import React from 'react'

const FileData = (props) => {
    
    if (props.selectedFile) {
       
      return (
        <div>
          <h4>File Details:</h4>
            <h6>File Name: {props.selectedFile.name}</h6>
            <h6>File Type: {props.selectedFile.type}</h6>
            <h6>Last Modified: {props.selectedFile.lastModified}</h6>
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