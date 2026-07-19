import React from 'react'
import Skeleton from './Skeleton'
const SkeletonCard = () => {
  return (
  <>
    <div>
        <div className='skeleton-card'>
      <div><Skeleton height="140px" width="90%" radius="10px"/>
      <Skeleton height="30px" width="70%" radius="10px"/>
      <Skeleton height="40px" width="30%" radius="10px"/></div>
    </div>
    </div></>
  )
}

export default SkeletonCard
