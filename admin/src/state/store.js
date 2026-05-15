import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/productReducer"

const store = configureStore({
    reducer:{
       product:ProductReducer
    }
});

export default store;