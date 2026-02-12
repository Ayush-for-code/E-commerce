import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, { getState, rejectWithValue }) => {
    try {
      // ✅ READ FROM product slice
      const { query, category } = getState().product;

      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (category) params.append("category", category);

      const res = await fetch(
        `http://localhost:3000/api/filter?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      // ✅ return ONLY array
      return data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    query: "",
    category: "",
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; // ✅ already array
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, setCategory } = productSlice.actions;
export default productSlice.reducer;
