import { combineReducers, configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { orderReducer } from "./orderReducer";
import { authReducer } from "./authReducer";
import { discountReducer } from "./discountReducer";
import thunkMiddleware from 'redux-thunk';
import myCustomApiService from "@/services/apiService";
import { createStore } from 'redux';
import { rollsReducer } from "./rollsReducer";
import { drinksReducer } from "./drinksReducer";
import { setsReducer } from "./setsReducer";
import { soucesReducer } from "./soucesReducer";
import { productReducer } from "./productReducer";

const store = configureStore({
  reducer: {
    // [productApi.reducerPath]: productApi.reducer,
    auth: authReducer,
    order: orderReducer,
    discounts: discountReducer,
    rolls: rollsReducer,
    drinks: drinksReducer,
    sets: setsReducer,
    souces: soucesReducer,
    products: productReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productApi.middleware),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: myCustomApiService,
    },
    serializableCheck: false,
  }),
})


export type TypeRootReducer = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export default store;