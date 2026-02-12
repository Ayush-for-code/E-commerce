import React from 'react'

const Address = () => {
  return (
    <div className='addresses'>
      <form className='address-form'>
        <input type="text" name="name" id="name" placeholder='Name' />
        <input type="number" name="phNO" id="phNO" placeholder='PhoneNO' />
        <input type="text" name="addressline" id="addressline" placeholder='Addressline' />
        <input type="text" name="landmark" id="landmark" placeholder='Landmark' />
        <select name="country" id="country">
            <option value="india">India</option>
            <option value="russia">russia</option>
        </select>
        <select name="state" id="state">
            <option value="uttrakhand">uttrakhand</option>
            <option value="kerala">kerala</option>
        </select>
        <input type="text" name="city" id="city" />
        <input type="number" name="pincode" id="pincode" maxLength={6} placeholder='Pincode'/>


      </form>
      <div className='add'>
        
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      </div>
    </div>
  )
}

export default Address
