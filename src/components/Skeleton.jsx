import React from 'react'

const Skeleton = (props) => {
  return (
    <div className='skeleton' style={{height:props.height,width:props.width,borderRadius:props.radius}}>
      
    </div>
  )
}

export default Skeleton
