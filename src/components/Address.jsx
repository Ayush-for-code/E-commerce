import React from 'react'

const Address = () => {
  return (
    <div>
      <form>
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
    </div>
  )
}

export default Address
