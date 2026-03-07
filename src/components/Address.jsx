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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAddress(input));
    setOpen(false);
  };
  const handleUpdate = (e)=>{
      e.preventDefault();

  dispatch(
    updateAddress({
      id: selectedId,
      addressData: input,
    })
  );

  setEditMode(false);
  setSelectedId(null);
  setOpen(false);
  console.log(input)
  console.log(selectedId)
  }
  const handleRemove = (id) => {
    dispatch(deleteAddress(id));
    dispatch(fetchAddress());
    console.log(address);
  };
  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEdit = (item) => {
    setInput(item);
    setOpen(true);
    setSelectedId(item._id);
    setEditMode(true);
  };
const handleDefault = (item)=>{
  setDefault(true)
dispatch(setDefaultAddress(item._id))
}
  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);
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
            <option value="">Select State</option>
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
          <input type="submit" value={editMode ? "update" : "add"} />
        </form>
        <button onClick={() => {setOpen(true),setInput({ name: "",
    phoneNo: "",
    addressLine: "",
    landmark: "",
    state: "",
    country: "",
    city: "",
    pincode: ""})}}>add</button>
        {address.map((items) => (
          <div key={items._id} className="add-card">
            <button   className={`default-btn ${items.isDefault ? "default" : ""}`} onClick={()=>{handleDefault(items)}}>{items.isDefault ? "default" : "SetDefault"}</button>
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
            <button
              onClick={() => {
                handleRemove(items._id);
              }}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Address;
