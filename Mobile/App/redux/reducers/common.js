import { categoryTypes } from "../types/category";

const INITAL_STATE = {
  hide: false,
};

export default reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "HIDE_TABBAR":
      return { ...state, hide: action.payload };
    default:
      return state;
  }
};
