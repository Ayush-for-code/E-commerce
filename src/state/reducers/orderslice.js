import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk("order/createOrder", async ({id,qty},{rejectWithValue}) => {
  try {
    const res = await fetch(`http://localhost:3000/api/order/create`,{
        method:"POST",
        headers:{
            "Content-type" :"application/json",
            "auth-token": localStorage.getItem("auth-token")
        },
        body:{
            productId:id,
            quantity:qty
        }
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    rejectWithValue(error.message)
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    loading: false,
    error: null,
  },
  reducers: {
    confirmOrder: () => {
      console.log("working");
    },
    cancleOrder: (state, action) => {
      console.log("working");
    },
    loading: (state, action) => {
      console.log("working");
    },
    error: (state, action) => {
      console.log("working");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, () => {});
  },
});

export const { confirmOrder, cancleOrder, loading, error } = orderSlice.actions;
export default orderSlice.reducer;
