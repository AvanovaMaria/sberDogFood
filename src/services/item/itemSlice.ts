import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from '../hooks';

interface Product {
	data: Item | null
	loading: boolean | null
	error: SerializedError| null | unknown
};

const initialState: Product = {
    data: null,
    loading: false,
    error: null,
};

const itemSliceName = "item";

export const fetchItem = createAppAsyncThunk<Item, string> (
    `${itemSliceName}/fetchItem`,
    async(productID, {fulfillWithValue, rejectWithValue, extra: api}) => {
        try {
            const data = await api.getProductById(productID);
            return fulfillWithValue(data);
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const ItemSlice = createSlice({
    name: itemSliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchItem.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchItem.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
      },
});

export default ItemSlice.reducer;