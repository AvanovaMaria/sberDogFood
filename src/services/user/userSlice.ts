import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from '../hooks';
import { UserEditBodyDto } from '../../utils/api';
import type { PayloadAction } from '@reduxjs/toolkit';

type TUserState = {
  data: Author | null;
  loading: boolean | null;
  error: SerializedError | null | unknown;
};

const initialState: TUserState = {
  data: null,
  loading: false,
  error: null,
};

const sliceName = "user";

export const fetchUsers = createAppAsyncThunk<Author>(
  `${sliceName}/fetchUsers`,
  async (_, { fulfillWithValue, rejectWithValue, extra: api}) => {
    try {
      const data = await api.getUserInfo();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchEditedUser = createAppAsyncThunk<Author, UserEditBodyDto>(
	`${sliceName}/fetchEditedUser`,
	async (dataUser, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const data = await api.setUserInfo(dataUser);
			if (data.name) {
				return fulfillWithValue(data);
			} else {
				return rejectWithValue(data);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
		setUser(_, action: PayloadAction<Author>) {
			return { data: action.payload, loading: false, error: null }
		},
		clearUser() {
			return { data: null, loading: false, error: null }
		},
	},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
