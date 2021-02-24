import React from 'react'

const VolumeInsert = ({player}) => {
  
  const volumeUp = (event) => {
    event.preventDefault()
    player.volume.value += 5
  }

  const volumeDown = (event) => {
    event.preventDefault()
    player.volume.value -= 5
  }

  return(
    <section>
      <h6>Volume:<br/>
        <input type="submit" onClick={volumeUp} value="<)))"/>
        <input type="submit" onClick={volumeDown} value="<"/>
      </h6>
    </section>
  )

}
export default VolumeInsert