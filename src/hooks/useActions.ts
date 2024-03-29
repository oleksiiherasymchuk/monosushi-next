import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { adminActions } from "../redux/adminReducer";
import { discountActions } from "../redux/discountReducer";
import { orderActions } from "../redux/orderReducer";
import { authActions } from "../redux/authReducer";
import { rollsActions } from "../redux/rollsReducer";
import { drinksActions } from "../redux/drinksReducer";
import { setsActions } from "../redux/setsReducer";
import { soucesActions } from "../redux/soucesReducer";
import { productActions } from "../redux/productReducer";

const allActions = {
  ...adminActions,
  ...authActions,
  ...discountActions,
  ...orderActions,
  ...rollsActions,
  ...drinksActions,
  ...setsActions,
  ...soucesActions,
  ...productActions,
  ...orderActions,
  
};

export const useActions = () => {
  const dispatch = useDispatch();
  // const dispatch = useDispatch<AppDispatch>()
  return bindActionCreators(allActions, dispatch);
};
