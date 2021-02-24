import React from 'react'
import * as Tone from 'tone'

const DelayInsert = ({recorder, player}) => {
  const pingPong = new Tone.PingPongDelay(0.50 , 0.25).connect(recorder).toDestination();

  const onPing = (event) => {
    event.preventDefault()
    player.connect(pingPong)
  }

  const noPing = (event) => {
    event.preventDefault()
    player.disconnect(pingPong)
  }

  return(
    <section>
      <h6>Delay: <br/>
        <input type="submit" onClick={onPing} value="O)))"/>
        <input type="submit" onClick={noPing} value="O"/>
      </h6>
    </section>
  )

}
export default DelayInsert