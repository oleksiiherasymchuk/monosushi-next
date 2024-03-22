import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./orderReducer";
import { authReducer } from "./authReducer";
import { discountReducer } from "./discountReducer";
import myCustomApiService from "@/services/apiService";
import { rollsReducer } from "./rollsReducer";
import { drinksReducer } from "./drinksReducer";
import { setsReducer } from "./setsReducer";
import { soucesReducer } from "./soucesReducer";
import { productReducer } from "./productReducer";
import { adminReducer } from "./adminReducer";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    order: orderReducer,
    discounts: discountReducer,
    rolls: rollsReducer,
    drinks: drinksReducer,
    sets: setsReducer,
    souces: soucesReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService,
      },
      serializableCheck: false,
    }),
});

export type TypeRootReducer = ReturnType<typeof store.getState>;

export default store;
