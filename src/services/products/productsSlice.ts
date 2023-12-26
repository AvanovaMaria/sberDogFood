import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from '../hooks';
import { UserEditBodyDto } from '../../utils/api';

type TProductsState = {
    data: Item[] | [];
    loading: boolean;
    error: SerializedError | null | unknown;
  };

  const initialState: TProductsState = {
    data: [],
    loading: false,
    error: null,
  };

  const productsSliceName = "producta";

  export const fetchProducts = createAppAsyncThunk<Item[]>(
    `${productsSliceName}/fetchProducts`,
    async (_, { fulfillWithValue, rejectWithValue, extra: api}) => {
      try {
        const data = await api.getProductsList();
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const productsSlice = createSlice({
    name: productsSliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        }
  });

export default productsSlice.reducer;