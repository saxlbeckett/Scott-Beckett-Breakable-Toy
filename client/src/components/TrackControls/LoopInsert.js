import React from 'react'

const LoopInsert = ({player}) => {
  
  const onLoop = (event) => {
    event.preventDefault()
    player.loop = true
  }

  const noLoop = (event) => {
    event.preventDefault()
    player.loop = false
  }

  return(
    <section>
      <h6>Loop:<br/>
        <input type="submit" onClick={onLoop} value="@"/>
        <input type="submit" onClick={noLoop} value="x"/>
      </h6>
    </section>
  )

}
export default LoopInsert