import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from "../state/reducers/address";
import {useAuth} from "@clerk/react";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDefault, setDefault] = useState(false);
  const [input, setInput] = useState({
    name: "",
    phoneNo: "",
    addressLine: "",
    landmark: "",
    state: "",
    country: "",
    city: "",
    pincode: "",
  });
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector((state) => state.addresses);
    const { getToken, isLoaded, isSignedIn } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = await getToken();
    const result = await dispatch(createAddress({addressData:input,token}));
    setOpen(false);
  };
  const handleUpdate = async (e)=>{
      e.preventDefault();
 const token = await getToken();
 const result = await dispatch(
    updateAddress({
      id: selectedId,
      addressData: input,
      token
    })
  );

  setEditMode(false);
  setSelectedId(null);
  setOpen(false);
  console.log(input)
  console.log(selectedId)
  }
  const handleRemove = async(id) => {
    const token = await getToken();
    const deleteInput = await dispatch(deleteAddress({addressId:id,token:token}));
    const result = await dispatch(fetchAddress(token));
    console.log(address);
  };
  const handleInput = (e) => {
  const { name, value } = e.target;

  if (name === "phoneNo" && value.length > 10) return;
  if (name === "pincode" && value.length > 6) return;

  setInput((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const handleEdit = (item) => {
    setInput(item);
    setOpen(true);
    setSelectedId(item._id);
    setEditMode(true);
  };
const handleDefault = async(item)=>{
  setDefault(true)
 const token = await getToken();
const result = await dispatch(setDefaultAddress({id:item._id,token}))
}
  useEffect(() => {
     const loadAddress = async () => {
      if (!isLoaded || !isSignedIn) return;

      const token = await getToken();
    const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/user/me`,{
        method : "GET",
        headers :{
          Authorization:`Bearer ${token}`,
        }
      });
      const data = await res.json();
      console.log(data);


      dispatch(fetchAddress(token));
    };

    loadAddress();

  }, [isLoaded, isSignedIn, getToken, dispatch]);
  return (
    <>
      <div className="addresses">
        {open && <div className="overlay" onClick={() =>{setOpen(false); setEditMode(false)}}></div>}
        <form
          onSubmit={editMode ? handleUpdate : handleSubmit}
          className={`form ${open ? "form-open" : ""}`}
        >
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            placeholder="Name"
            onChange={handleInput}
          />
          <input
            type="number"
            name="phoneNo"
            id="phNO"
           value={input.phoneNo}
            placeholder="PhoneNO"
            onChange={handleInput}
            maxLength={10}
          />
          <input
            type="text"
            name="addressLine"
            id="addressline"
              value={input.addressLine}
            placeholder="Addressline"
            onChange={handleInput}
          />
          <input
            type="text"
            name="landmark"
            id="landmark"
              value={input.landmark}
            placeholder="Landmark"
            onChange={handleInput}
          />
          <select
            name="country"
            id="country"
            value={input.country}
            onChange={handleInput}
          >
            <option value="">Select State</option>
            <option value="india">India</option>
            <option value="russia">russia</option>
          </select>
          <select
            name="state"
            id="state"
            value={input.state}
            onChange={handleInput}
          >
            <option value="">Select Country</option>
            <option value="uttrakhand">uttrakhand</option>
            <option value="kerala">kerala</option>
          </select>
          <input
            type="text"
            name="city"
            id="city"
            value={input.city}
            placeholder="city"
            onChange={handleInput}
          />
          <input
            type="number"
            name="pincode"
            id="pincode"
            maxLength={6}
            value={input.pincode}
            placeholder="Pincode"
            onChange={handleInput}
          />
          <input type="submit" value={editMode ? "Update" : "Add"} />
        </form>
        <button className="add-btn" onClick={() => {setOpen(true),setInput({ name: "",
    phoneNo: "",
    addressLine: "",
    landmark: "",
    state: "",
    country: "",
    city: "",
    pincode: ""})}}> 
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
<h2>Add new Address</h2>
<span>Add an address to get your order deliverd</span> </button>
<h2>Saved Address</h2>
        {address.map((items) => (
          <div key={items._id} className="add-card">
            <button   className={`default-btn ${items.isDefault ? "default" : ""}`} onClick={()=>{handleDefault(items)}}>{items.isDefault ? "Default" : "SetDefault"}</button>
            <div
              className="editbtn"
              onClick={() => {
                handleEdit(items);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </div>
            <h3>{items.name}</h3>
            <div className="addInfo">
              <p>phoneNO:{items.phoneNo}</p>
              <p>addressline:{items.addressLine}</p>
              <p>state:{items.state}</p>
              <p>city:{items.city}</p>
              <p>pincode:{items.pincode}</p>
              <p>landmark:{items.landmark}</p>
              <p>country:{items.country}</p>
            </div>
      
            <div className="remove"  onClick={() => {
                handleRemove(items._id);
              }}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Address;
