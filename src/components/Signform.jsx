import React from "react";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

const Signform = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  //fuction for handle submit after fecting data
  //saving input data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const notify = () =>
      toast.success("successfuly created a user", {
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
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/createuser",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const json = await res.data;
      console.log(json);
      console.log("successful created a user");
      if (json.success) {
        //after get singup now save authtoken in localStorage
        localStorage.setItem("auth-token", json.authtoken);
      }
      notify();
    } catch (err) {
       const notify = () =>
      toast.error("failed to created a user", {
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
      notify()
      console.error("signup error", err);
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="usernsme"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={onChange}
        />
        <input type="submit" value="sumbit" />
      </form>
    </div>
  );
};

export default Signform;
