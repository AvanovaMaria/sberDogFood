import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { ItemEditBodyDto } from "../../utils/api";
import { createAppAsyncThunk } from '../hooks';

type TItemState = {
    data: Item | null;
    loading: boolean;
    error: SerializedError | null | unknown;
};

const initialState: TItemState = {
    data: null,
    loading: false,
    error: null,
};

const itemSliceName = "item";

// export const fetchItem = createAppAsyncThunk<Item> (
//     `${itemSliceName}/fetchItem`,
//     async(itemId, {fulfillWithValue, rejectWithValue, extra: api}) => {
//         try {
//             const data = await api.getProductById(itemId);
//             return fulfillWithValue(data);
//         } catch (error) {
//             rejectWithValue(error);
//         }
//     }
// );

// console.log(fetchItem);

// export const ItemSlice = createSlice({
//     name: itemSliceName,
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//           .addCase(fetchItem.pending, (state) => {
//             state.loading = true;
//           })
//           .addCase(fetchItem.fulfilled, (state, action) => {
//             state.loading = false;
//             state.data = action.payload;
//           })
//           .addCase(fetchItem.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//           })
//       },
// });

// export default ItemSlice.reducer;