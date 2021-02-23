import React from 'react'

const ChannelInsert = (props) => {


  return(
    <section>
      <h6>{props.effectName}<br/>
        <input type="submit" onClick={props.handleClick1} value={props.symbol1}/>
        <input type="submit" onClick={props.handleClick2} value={props.symbol2}/>
      </h6>
    </section>
  )

}
export default ChannelInsert