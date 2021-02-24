import React from 'react'
import * as Tone from 'tone'

const BitCrusherInsert = ({recorder, player}) => {
  const crusher = new Tone.BitCrusher(4).connect(recorder).toDestination();

  const bitCrush = (event) => {
    event.preventDefault()
    player.connect(crusher)
  }

  const noCrush = (event) => {
    event.preventDefault()
    player.disconnect(crusher)
  }

  return(
    <section>
      <h6>Bit Crusher: <br/>
        <input type="submit" onClick={bitCrush} value="xXx"/>
        <input type="submit" onClick={noCrush} value="oOo"/>
      </h6>
    </section>
  )

}
export default BitCrusherInsert