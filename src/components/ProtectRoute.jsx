import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/react'

const ProtectRoute = ({children}) => {
const {isLoaded,isSignedIn} = useAuth();
// if clerk  still checking for session 
if(!isLoaded){
  return <div>Loading...</div>
}
// if user not login
if(!isSignedIn){
 return <Navigate to="/login" replace/>
}
// then returing the children 
return children;
}

export default ProtectRoute;
