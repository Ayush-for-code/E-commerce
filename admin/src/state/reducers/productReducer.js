import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk("product/addProduct",
    async(_,{rejectWithValue})=>{
     

});

export const getProduct = createAsyncThunk("product/getProduct",async(_,{rejectWithValue})=>{
try{
  const res = await fetch("http://localhost:3000/api/product/get");
 const data = await res.json();
 console.log(data);
 if(!data.success){
  return rejectWithValue(data.messsage)
 }
 console.log(data.products)
 return data.products
}
catch(err){
  return rejectWithValue(err.message)
}
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers:{

  },
  extraReducers: (builder)=>{
  builder
  .addCase(getProduct.pending,(state,action)=>{
  state.loading = true;
  state.error = null;
  })
  .addCase(getProduct.fulfilled,(state,action)=>{
  state.loading = false;
  state.products = action.payload;
  })
  .addCase(getProduct.rejected,(state,action)=>{
  state.loading = false;
  state.error = action.payload;
  })
  }
});

export default productSlice.reducer;