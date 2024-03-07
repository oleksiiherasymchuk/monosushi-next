import { firebaseService } from "@/services/firebaseService";
import { ProductType } from "@/shared/types/products/product";
import { Draft, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IRolls {
  loading: boolean;
  rolls: Draft<ProductType[]>;
}

const initialState: IRolls = {
  loading: true,
  rolls: [],
};

export const setLoading = (loading: boolean) => ({
  type: "rolls/setLoading",
  payload: loading,
});

export const getRollsFromFirebaseThunk = createAsyncThunk(
  "rolls/getRolls",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const rolls = await firebaseService.getRolls();
      return rolls;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const rollsSlice = createSlice({
  name: "rolls",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRollsFromFirebaseThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.rolls = action.payload;
        }
      })
      .addCase(getRollsFromFirebaseThunk.rejected, (state, action) => {
        console.error(action.error);
      });
  },
});

export const rollsReducer = rollsSlice.reducer;
export const rollsActions = {
  ...rollsSlice.actions,
  getRollsFromFirebaseThunk,
};
