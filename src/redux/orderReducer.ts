import { orderService } from "@/services/orderService";
import { ProductType } from "@/shared/types/products/product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IOrder {
  products: ProductType[] | [];
  productPrice: string;
  totalPrice: string;
  loading: boolean;
  orders: ProductType[] | null;
}

const initialState: IOrder = {
  products: [],
  orders: [],
  productPrice: "0",
  totalPrice: "0",
  loading: false,
};

const addDecimal = (sum: number) => {
  return (Math.round(sum * 100) / 100).toFixed(2);
};

export const setLoading = (loading: boolean) => ({
  type: "order/setLoading",
  payload: loading,
});

export const getCurrentUserOrdersThunk = createAsyncThunk(
  "order/getCurrentUserOrder",
  async (userId: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const currentUserOrders = await orderService.getUserOrder(userId);
      return currentUserOrders;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createUserOrderThunk = createAsyncThunk(
  "order/createUserOrder",
  async (data: { products: ProductType[]; userId?: string }, { dispatch }) => {
    const { products, userId } = data;
    try {
      dispatch(setLoading(true));
      const createOrder = await orderService.createOrder(products, userId);
      return createOrder;
    } catch (error) {
      console.error("Error creating user order:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const newProduct = action.payload;
      const isProductExistsInBasket = state.products.find(
        (prod) => prod.id === newProduct.id
      );
      if (isProductExistsInBasket) {
        state.products = state.products.map((prod) =>
          prod.id === isProductExistsInBasket.id ? newProduct : prod
        );
      } else {
        state.products = [...state.products, newProduct];
      }
      state.productPrice = addDecimal(
        state.products.reduce(
          (acc, prod) => acc + Number(prod.price) * prod.quantity!,
          0
        )
      );
      state.totalPrice = addDecimal(Number(state.productPrice));
    },
    deleteFromBasket: (state, action) => {
      state.products = state.products.filter(
        (prod) => prod.id !== action.payload.id
      );
      state.productPrice = addDecimal(
        state.products.reduce(
          (acc, prod) => acc + Number(prod.price) * prod.quantity!,
          0
        )
      );
      state.totalPrice = addDecimal(Number(state.productPrice));
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string | undefined; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.products = state.products.map((prod) =>
        prod.id === id ? { ...prod, quantity } : prod
      );
      state.productPrice = addDecimal(
        state.products.reduce(
          (acc, prod) => acc + Number(prod.price) * prod.quantity!,
          0
        )
      );
      state.totalPrice = addDecimal(Number(state.productPrice));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserOrdersThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders = action.payload;
        }
      })
      .addCase(createUserOrderThunk.fulfilled, (state, action: any) => {
        debugger;
        if (action.payload) {
          state.orders?.push(action.payload);
        }
        state.products = [];
        toast.success("Ваше замовлення прийнято!");
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = {
  ...orderSlice.actions,
  getCurrentUserOrdersThunk,
  createUserOrderThunk,
};
