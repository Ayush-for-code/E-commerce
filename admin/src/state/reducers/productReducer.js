import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk("product/addProduct",
    async(productData,{rejectWithValue})=>{
     try{
      console.log("productdata",productData)
       const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/product/create`,{
        method :"POST",
        headers:{
          "auth-token":localStorage.getItem("auth-token")
        },
        body:productData
       });
       console.log("string",JSON.stringify(productData));
       const data = await res.json();
       if(!data){
        return rejectWithValue(data.message);
       }
       return data.product
     }
     catch(err){
       return rejectWithValue(err.message);
     }
});

export const getProduct = createAsyncThunk("product/getProduct",async(_,{rejectWithValue})=>{
try{
  const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/product/get`);
 const data = await res.json();
 console.log(`products are here ${data}`);
 if(!data.success){
  return rejectWithValue(data.messsage)
 }
 console.log("products",data.products)
 return data.products
}
catch(err){
  return rejectWithValue(err.message)
}
})
export const updateProuduct = createAsyncThunk("product/updateProuct", async({id,updateData},{rejectWithValue})=>{
  try{
   const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/product/update/${id}`,{
    method:"PUT",
    headers:{
        "Content-type": "application/json",
        "auth-token":localStorage.getItem("auth-token")
    },
    body:JSON.stringify(updateData)
   })
   const data = await res.json();
   if(!data.success){
    return rejectWithValue(data.message)
   }
   return data.products;
  }
  catch(err){
    return rejectWithValue(err.message)
  }
});
 
export const deleteProduct = createAsyncThunk("product/deleteProduct",async(id,{rejectWithValue})=>{
 try{
 const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/product/remove/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      "auth-token" : localStorage.getItem("auth-token")
    }
  });
   const data = await res.json();
   if(!data.success){
    return rejectWithValue(data.message)
   }
   return id;
 }
 catch(err){
   return rejectWithValue(err.message)
 }

});


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
  .addCase(addProduct.pending,(state,action)=>{
    state.loading = true ;
    state.error = null;
  })
  .addCase(addProduct.fulfilled,(state,action)=>{
    state.loading = false ;
     console.log(action.payload);
    state.products.push(action.payload);
  })
  .addCase(addProduct.rejected,(state,action)=>{
    state.loading = false ;
    state.error = action.payload ;
  })
  .addCase(updateProuduct.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload ;
  })
  .addCase(updateProuduct.fulfilled,(state,action)=>{
    state.loading = false;
  state.products = state.products.map((product)=>
     product._id === action.payload._id ?
     action.payload:product
);
  })
  .addCase(updateProuduct.pending,(state)=>{
    state.loading = true;
    state.error = null;
  })
  .addCase(deleteProduct.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload;
  })
  .addCase(deleteProduct.fulfilled,(state,action)=>{
    state.loading = false;
   state.products = state.products.filter((product)=> 
     product._id !== action.payload
   )
  })
  .addCase(deleteProduct.pending,(state)=>{
    state.loading = true;
    state.error = null;
  })
  }
});

export default productSlice.reducer;