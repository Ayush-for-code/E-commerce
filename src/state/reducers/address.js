import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//for fetching user addresses

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/address/get", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      return data.addressDoc.addresses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//for adding user address i name it createaddress bcz the name is already taken
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/address/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(addressData),
      });
      const data = await res.json();
      console.log(addressData);
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data.address;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//for removing user address from data base
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/address/remove/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        },
      );
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return addressId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//for updating user addresses form database
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({id,addressData},{rejectWithValue}) => {
       try {
      const res = await fetch(
        `http://localhost:3000/api/address/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(addressData)
        },
      );
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
     console.log("successfully upgraded your address");
      return data.address
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//for setDeault address to use only one address for order at a time 
export const setDefaultAddress = createAsyncThunk("address/setDefaultAddress", async (id,{rejectWithValue})=>{
  try {
      const res = await fetch(
        `http://localhost:3000/api/address/setDefault/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          }         
        },
      );
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
     console.log("setdefault");
      return data.addresses

    } catch (err) {
      return rejectWithValue(err.message);
    }
});

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    isDefault: false,
    loading: false,
    error: null,
  },
  reducers: {
    addAddress: (state, action) => {
      console.log("working");
    },
    removeAddress: (state, action) => {
      console.log("working");
    },
    setDefault: (state, action) => {
      console.log("working");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = state.address.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAddress.rejected, (state,action)=>{
         state.loading = false;
         state.error = action.payload;
      })
      
      .addCase(updateAddress.pending, (state)=>{
         state.loading = true;
         state.error = null;
      })
      
      .addCase(updateAddress.fulfilled, (state,action)=>{
        //still need to learn this paart
           state.loading = false;
  const index = state.address.findIndex(
    (item) => item._id === action.payload._id
  );

  if (index !== -1) {
    state.address[index] = action.payload;
  }
      })
      .addCase(setDefaultAddress.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled,(state,action)=>{
        state.loading = false;
        state.address = action.payload;
        
      })
      .addCase(setDefaultAddress.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { addAddress, removeAddress, setDefault } = addressSlice.actions;

export default addressSlice.reducer;
