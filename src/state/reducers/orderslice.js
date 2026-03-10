import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ id, qty }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/order/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(
          {
            items: [
              {
                productId:id,
                quantity:qty
              }
            ],
              shippingAddress: {
      address: "front of GIC ward no:4 gadarpur",
      state: "uttrakhand",
      city: "gadarpur",
      pincode: 263152
    }
          },
        ),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
    return  rejectWithValue(error.message);
    }
  },
);
//for fetching all orders from user
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/order/get`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      console.log(data.orders);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

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
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { confirmOrder, cancleOrder, loading, error } = orderSlice.actions;
export default orderSlice.reducer;
