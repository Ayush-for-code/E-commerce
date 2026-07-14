import React from 'react'

const skeleton = (props) => {
  return (
  <>
     <div className='skeleton' style={{height:props.height,width:props.width,borderRadius:props.radius}}>
      
    </div>
  </>
  )
}

export default skeleton
