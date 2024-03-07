import { firebaseService } from "@/services/firebaseService";
import { ProductType } from "@/shared/types/products/product";
import { Draft, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IDrinks {
  loading: boolean;
  drinks: Draft<ProductType[]>;
}

const initialState: IDrinks = {
  loading: true,
  drinks: [],
};

export const setLoading = (loading: boolean) => ({
  type: 'drinks/setLoading',
  payload: loading,
});

export const getDrinksFromFirebaseThunk = createAsyncThunk(
  "drinks/getDrinks",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const drinks = await firebaseService.getDrinks();
      return drinks;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDrinksFromFirebaseThunk.fulfilled, (state, action) => {
        if(action.payload){
          state.drinks = action.payload;
        }
      })
      .addCase(getDrinksFromFirebaseThunk.rejected, (state, action) => {
        console.error(action.error);
      });
      
  },
});

export const drinksReducer = drinksSlice.reducer;
export const drinksActions = {...drinksSlice.actions, getDrinksFromFirebaseThunk};
