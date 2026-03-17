import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const createPayment = createAsyncThunk("payment/createPayment",async(id,{rejectWithValue})=>{
try{
const res = await fetch("http://localhost:3000/api/payment/create",{
    method:"POST",
    headers:{
         "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify({
        productId:id
    })
});
const data = await res.json();
console.log(data);
return data;
// const paymentObject = new (window as any).Rozarpay({
//     key:"rzp_test_SQc4XgiRWHRCAA",
//     order_id:data.id,...data
// })
}
catch(err){
  return rejectWithValue(err.message);
}

})
export const verifyPayment = createAsyncThunk("payment/verifyPayment",async(id,{rejectWithValue})=>{
try{
const res = await fetch("http://localhost:3000/api/payment/verify",{
    method:"POST",
    headers:{
         "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify({
        productId:id
    })
});
const data = await res.json();
console.log(data);
return data;
// const paymentObject = new (window as any).Rozarpay({
//     key:"rzp_test_SQc4XgiRWHRCAA",
//     order_id:data.id,...data
// })
}
catch(err){
  return rejectWithValue(err.message);
}

})

const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        payment:null,
        verified:false,
        loading:false,
        error:null
    },
    extraReducers: (builder)=>{
    builder
    .addCase(createPayment.pending,(state)=>{
   state.loading = true
   state.error = null
    })
    .addCase(createPayment.fulfilled,(state,action)=>{
        state.loading = false;
        state.payment = action.payload;
        state.error = null;
    })
    .addCase(createPayment.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(verifyPayment.pending,(state)=>{
        state.loading = ture;
        state.verified = false;

    })
    .addCase(verifyPayment.fulfilled,(state)=>{
        state.loading = false;
        state.verified = true;
    })
    .addCase(verifyPayment.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.verified = false;
    })
    }
});

export default paymentSlice.reducer;