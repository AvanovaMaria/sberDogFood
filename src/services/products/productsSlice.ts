import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../hooks";
import { UserEditBodyDto } from "../../utils/api";

interface fetchProductsPayload {
  search?: string
}

interface Products {
  data: Item[];
  loading: boolean | null;
  error: SerializedError | null | unknown;
}

const initialState: Products = {
  data: [],
  loading: false,
  error: null,
};

const productsSliceName = "products";

export const fetchProducts = createAppAsyncThunk<
  FetchAllProducts,
  fetchProductsPayload
>(
  `${productsSliceName}/fetchProducts`,
  async ({ search = '' }, { fulfillWithValue, rejectWithValue, extra: api }) => {
    try {
      const data = await api.getProductsList({search});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchProducts = (payload: string) =>
  fetchProducts({ search: payload });

export const setLike = createAppAsyncThunk<void, string>(
  `${productsSliceName}/setLike`,
  async (productId, { fulfillWithValue, rejectWithValue, extra: api }) => {
    try {
      const data = await api.addLikes({ productId });
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteLike = createAppAsyncThunk<void, string>(
  `${productsSliceName}/deleteLike`,
  async (productId, { fulfillWithValue, rejectWithValue, extra: api }) => {
    try {
      const data = await api.addLikes({ productId });
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const productsSlice = createSlice({
  name: productsSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
