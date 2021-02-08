import * as Tone from 'tone'
import React from 'react'

const Synth = (props) => {

    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()
    const handleClick = (event) => {
        synth.triggerAttackRelease("C4", "8n", 0.5)
        synth.triggerAttackRelease("E4", "8n", 0.5) 
        synth.triggerAttackRelease("G4", "8n", 0.5)
    }


    return (
        <div>
            <h1 onClick={handleClick}>HI THERE</h1>
        </div>
    )

}
export default Synth