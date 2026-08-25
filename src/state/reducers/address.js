import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//for fetching user addresses

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async(token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/address/get`, {
        method: "GET",
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      console.log("working",data);
      return data.addressDoc.addresses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//for adding user address i name it createaddress bcz the name is already taken
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async ({addressData,token}, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/address/add`, {
        method: "POST",
        headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json"
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
  async ({addressId,token}, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_RENDERURI}/api/address/remove/${addressId}`,
        {
          method: "DELETE",
          headers: {
             Authorization: `Bearer ${token}`,
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
  async ({ id, addressData,token }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_RENDERURI}/api/address/update/${id}`,
        {
          method: "PUT",
          headers: {
             Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",

          },
          body: JSON.stringify(addressData),
        },
      );
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      console.log("successfully upgraded your address");
      return data.address;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//for setDeault address to use only one address for order at a time
export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async ({id,token}, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_RENDERURI}/api/address/setDefault/${id}`,
        {
          method: "POST",
          headers: {
             Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            
          },
        },
      );
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      console.log("setdefault");
      return data.addresses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

//slice for fetch only deafult address
export const fetchDefaultAddress = createAsyncThunk(
  "address/fetchDefaultAddress",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/address/fetchDefault`, {
        method: "POST",
        headers: {
           Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
         
        },
      });
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      console.log(data);
      return data.defaultAddress;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

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
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        //still need to learn this paart
        state.loading = false;
        const index = state.address.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.address[index] = action.payload;
        }
      })
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addAddress, removeAddress, setDefault } = addressSlice.actions;

export default addressSlice.reducer;
