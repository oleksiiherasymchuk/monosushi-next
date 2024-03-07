import { firebaseService } from "@/services/firebaseService";
import { ProductType } from "@/shared/types/products/product";
import { Draft, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ISets {
  loading: boolean;
  sets: Draft<ProductType[]>;
}

const initialState: ISets = {
  loading: true,
  sets: [],
};

export const setLoading = (loading: boolean) => ({
  type: 'sets/setLoading',
  payload: loading,
});

export const getSetsFromFirebaseThunk = createAsyncThunk(
  "sets/getSets",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const sets = await firebaseService.getSets();
      return sets;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSetsFromFirebaseThunk.fulfilled, (state, action) => {
        if(action.payload){
          state.sets = action.payload;
        }
      })
      .addCase(getSetsFromFirebaseThunk.rejected, (state, action) => {
        console.error(action.error);
      })
      // .addCase(getSetsFromFirebaseThunk.pending, (state, action) => {
      //   console.log(action)
      // })
      
  },
});

export const setsReducer = setsSlice.reducer;
export const setsActions = {...setsSlice.actions, getSetsFromFirebaseThunk};
