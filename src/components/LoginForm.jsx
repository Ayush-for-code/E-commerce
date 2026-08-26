import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { ToastContainer, toast, Bounce } from "react-toastify";
import {Link,useNavigate,Navigate} from "react-router-dom"
import { useAuth} from "@clerk/react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";

const LoginForm = () => {
    const [user,setUser] = useState({email:"",password:""});
     const { isLoaded,isSignedIn, getToken } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
  if (!isLoaded) return;

  if (isSignedIn) {
    navigate("/");
  }
}, [isLoaded, isSignedIn, navigate]);
    if (!isLoaded) {
  return <div>Loading...</div>;
}
//    if (isSignedIn) {
//   return <Navigate to="/" replace />;
// }
    //  const handleToast = async (e)=>{
    // e.preventDefault()
    // const notify = () =>
    //         toast.success("successfuly login", {
    //           position: "top-center",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: false,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "dark",
    //           transition: Bounce,
    //         });
    //      try{
    //       const res = await axios.post(`${import.meta.env.VITE_RENDERURI}/api/auth/login`,{email:user.email,password:user.password},{
    //         headers:{
    //          "Content-Type":"application/json"
    //         }
    //       });
    //       const json =  res.data;
    //       console.log("successfuly login")
    //       if(json.success){
    //         //after login info get checked then save it to local
    //          localStorage.setItem("auth-token",json.authtoken)
    //       }
 
    //         notify()
    //      navigate("/")
    //      }
    //      catch(err){
    //       const notify = () =>
    //         toast.error("login failed", {
    //           position: "top-center",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: false,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "dark",
    //           transition: Bounce,
    //         });
    //       console.error("login denied",err)
    //       notify()
    //      }
    // }
    
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  return (
    <div className='login'>
    <h2>Sign in</h2>
      <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
      {/* <form onSubmit={handleToast}>
        <input type="text" name="email" id="" placeholder='email' onChange={onChange} />
        <input type="password" name="password" id="" placeholder='password' onChange={onChange}/>
        <input type="submit" value="sumbit" />
      </form> */}
    <div>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        
    </div>
    <h5>signup if you dont have a account</h5>
    </div>
  )
}

export default LoginForm
