import React from 'react'

const SpeedInsert = ({player}) => {

  const speedUp = (event) => {
    event.preventDefault()
    player.playbackRate += 0.10
  }

  const speedDown = (event) => {
    event.preventDefault()
    player.playbackRate -= 0.10
  }

  return(
    <section>
      <h6>Speed:<br/>
        <input type="submit" onClick={speedUp} value="+"/>
        <input type="submit" onClick={speedDown} value="-"/>
      </h6>
    </section>
  )

}
export default SpeedInsert