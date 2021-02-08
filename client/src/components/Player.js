import * as Tone from 'tone'
import React from 'react'

const Player = (props) => {

    const handleClick = (event) => {
        const player = new Tone.Player("/Users/scottbeckett/Dropbox/Launch Academy/challenges/Scott-Beckett-Breakable-Toy/client/src/components/AudioSamples/The Theme From SCAN.mp3").toDestination();
        Tone.loaded().then(() => {
        player.start();
        });
    }
    return(
        <div>
            <h1 onClick={handleClick}>HI THERE BABY</h1>
        </div>
    )
}
export default Player