import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import orderReducer from "./reducers/orderslice";
import addressReducer from "./reducers/address"

const store = configureStore({
  reducer: {
    product: productReducer,
    order:orderReducer,
    addresses:addressReducer
  },
});

export default store;
