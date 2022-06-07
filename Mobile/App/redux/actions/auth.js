import axios from "axios";
import { authTypes } from "../types/auth";

export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.SIGN_IN, payload });
    console.log(payload);
    const response = await axios.post(
      "http://192.168.0.11:3000/login",
      payload
    );
    console.log("response", response);
    dispatch({ type: authTypes.SIGN_IN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("error", error);

    dispatch({
      type: authTypes.SIGN_IN_FAILURE,
      payload: error.response.data,
    });
  }
};

export const signUp = (payload) => (dispatch) => {
  dispatch({ type: authTypes.SIGN_UP, payload });
  axios
    .post("http://192.168.0.11:3000/register", payload)
    .then((response) => {
      dispatch({ type: authTypes.SIGN_UP_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({
        type: authTypes.SIGN_UP_FAILURE,
        payload: error.response.data,
      });
    });
};
