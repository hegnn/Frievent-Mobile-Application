import { categoryTypes } from "../types/category";

const INITAL_STATE = {
  loading: false,
  error: false,
};

export default reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case categoryTypes.GET_CATEGORIES:
      return { ...state, loading: true, error: false };
    case categoryTypes.GET_CATEGORIES_SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload };
    case categoryTypes.GET_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: true, data: action.payload };

    default:
      return state;
  }
};
