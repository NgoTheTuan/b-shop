import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import setting from "./reducers/setting";
import category from "./reducers/category";
import cart from "./reducers/cart";

const rootReducer = combineReducers({
  auth,
  setting,
  category,
  cart,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
