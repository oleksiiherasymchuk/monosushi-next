import { firebaseService } from "@/services/firebaseService";
import { ProductType } from "@/shared/types/products/product";
import { Draft, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ISouces {
  loading: boolean;
  souces: Draft<ProductType[]>;
}

const initialState: ISouces = {
  loading: true,
  souces: [],
};

export const setLoading = (loading: boolean) => ({
  type: "souces/setLoading",
  payload: loading,
});

export const getSoucesFromFirebaseThunk = createAsyncThunk(
  "souces/getSouces",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const souces = await firebaseService.getSouces();
      return souces;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const soucesSlice = createSlice({
  name: "souces",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSoucesFromFirebaseThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.souces = action.payload;
        }
      })
      .addCase(getSoucesFromFirebaseThunk.rejected, (state, action) => {
        console.error(action.error);
      });
  },
});

export const soucesReducer = soucesSlice.reducer;
export const soucesActions = {
  ...soucesSlice.actions,
  getSoucesFromFirebaseThunk,
};
