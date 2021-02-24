import React from 'react'

const DirectionInsert = ({player}) => {
  
  const reverse = (event) => {
    event.preventDefault()
    player.reverse = true
  }

  const forward = (event) => {
    event.preventDefault()
    player.reverse = false
  }

  return(
    <section>
      <h6>Reverse/Forward:<br/>
        <input type="submit" onClick={reverse} value="<<"/>
        <input type="submit" onClick={forward} value=">>"/>
      </h6>
    </section>
  )

}
export default DirectionInsert