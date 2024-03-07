import { ProductType } from "@/shared/types/products/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ProductType[] = [];

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ProductType>) => {
      state.push(action.payload);
    },
    deleteFromBasket: (
      state,
      action: PayloadAction<{ id: number | string }>
    ) => {
      return state.filter((prod) => prod.id !== action.payload.id);
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
