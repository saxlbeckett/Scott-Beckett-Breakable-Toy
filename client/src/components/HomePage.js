import React, { useState, useEffect }from 'react'
import AudioTile from './AudioTile';

const HomePage = (props) => {
  
  const [audioFiles, setAudioFiles] = useState([]);

  const getAudio = async () => {
    try {
      const response = await fetch("/api/v1/audio");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setAudioFiles(body.allAudio);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getAudio();
  }, []);
  
  const mappedAudio = audioFiles.map((file) => {
    return(
      <AudioTile file={file} />
    )
  })
  
  return(
    <div className="main">
      <h1>community audio:</h1>
      <ul>{mappedAudio}</ul>
    </div>
  )
}
export default HomePage