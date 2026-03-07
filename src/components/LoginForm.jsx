import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from "react-toastify";

const LoginForm = () => {
    const [user,setUser] = useState({email:"",password:""});
     const handleToast = async (e)=>{
    e.preventDefault()
    const notify = () =>
            toast.success("successfuly login", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
         try{
          const res = await axios.post("http://localhost:3000/api/auth/login",{email:user.email,password:user.password},{
            headers:{
             "Content-Type":"application/json"
            }
          });
          const json =  res.data;
          console.log("successfuly login")
          if(json.success){
            //after login info get checked then save it to local
             localStorage.setItem("auth-token",json.authtoken)
          }
 
            notify()

         }
         catch(err){
          const notify = () =>
            toast.error("login failed", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          console.error("login denied",err)
          notify()
         }
    }
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className='login'>
    <h2>Login</h2>
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
      <form onSubmit={handleToast}>
        <input type="text" name="email" id="" placeholder='usernsme' onChange={onChange} />
        <input type="password" name="password" id="" placeholder='password' onChange={onChange}/>
        <input type="submit" value="sumbit" />
      </form>
    </div>
  )
}

export default LoginForm
