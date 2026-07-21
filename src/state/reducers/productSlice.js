import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({page=1}, { getState, rejectWithValue }) => {
    try {
      // ✅ READ FROM product slice
      const { query, category } = getState().product;

      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (category) params.append("category", category);
      params.append("page",page);

      const res = await fetch(
        `${import.meta.env.VITE_RENDERURI}/api/filter?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();

      // ✅ return ONLY array
      return {
        products:data.products,
        page:data.currentPage,
        hasMore:data.hasMore
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_RENDERURI}/api/product/single/${id}`);
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data.product;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    singleProduct:null,
    loading: false,
    query: "",
    category: "",
    hasMore:true,
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
        const {page,hasMore,products} = action.payload;
        if(page === 1){
          state.product = products;
        }
        else{
          state.product = [...state.product,...products]
        }
       state.hasMore = hasMore;
       state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleProduct = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, setCategory } = productSlice.actions;
export default productSlice.reducer;
