import { TypeRootReducer } from "@/redux/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<TypeRootReducer> =
  useSelector;
