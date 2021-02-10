import React, { useState } from 'react'
import MicRecorder from "mic-recorder-to-mp3"
import axios from 'axios'
//THIS NEEDS TO BE UPDATED TO MATCH THE UPLOADER FETCH
const Recorder = (props) => {

    const [isRecording, setIsRecording] = useState(false)
    const [isBlocked, setIsBlocked] = useState(true)
    const [atStop, setAtStop] = useState("")
    const [audioURL, setAudioURL] = useState("")

    const handleAudioFile = (ev) => {
            debugger
            let file = ev;
            let fileName = ev.name;
            let fileType = ev.type;
            axios.post("/api/v1/upload",{
            fileName : fileName, //parameter 1
            fileType : fileType  //parameter 2
        })
        .then(response => {
            var returnData = response.data.data.returnData;
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            var options = {
            headers: {
            'Content-Type': fileType,
            }
        };
            axios.put(signedRequest,file,options)
                .then(result => {
                    setAudioURL( url, ()=> console.log(audioURL))
                    alert("audio uploaded")})
                .catch(error => {
                    alert("ERROR " + JSON.stringify(error));
                })
            })
        .catch(error => {
            alert(JSON.stringify(error));
        })
    }

    
    const audioRecorder = new MicRecorder({ bitRate: 128 });
    let red = ""
    const start = (event) => {
        debugger

        if(isBlocked){
            console.log('permission Denied');
        }else{
            red="red"
            audioRecorder.start()
            .then(()=>{
                setIsRecording(true);
            }).catch((e)=> console.log(e));
        }
    };
    const stop = (event) => {
        debugger
        audioRecorder.stop()
        .getMp3()
        .then(([buffer, blob])=>{
            const blobUrl = URL.createObjectURL(blob)
            setAtStop(blobUrl);
            setIsRecording(false)
            var d = new Date();
            var file = new File([blob],d.valueOf(),{ type:"audio/wav" })
            console.log(file);
            handleAudioFile(file);
        }).catch((e)=>console.log('We could not retrieve your recording'));
    };
        

    navigator.mediaDevices.getUserMedia({ audio: true , video:false})
        .then(() => {
               console.log('Permission Granted');
               setIsBlocked(false);
        })
        .catch(() => {
               console.log('Permission Denied');
               setIsBlocked(true)
        }
    );

    return(
        <div>
            <h1>Record audio from you mic</h1>
            <button className={red} onClick={start} type="button">Start</button>
            <button onClick={stop} type="button">Stop</button>     
        </div>
    )

}
export default Recorder