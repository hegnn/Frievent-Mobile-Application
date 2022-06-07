import axios from "axios";
import { categoryTypes } from "../types/category";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: categoryTypes.GET_CATEGORIES });
    const response = await axios.get("http://192.168.0.11:3000/categories");
    console.log("response", response);
    dispatch({
      type: categoryTypes.GET_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: categoryTypes.GET_CATEGORIES_FAILURE, payload: response });
  }
};
