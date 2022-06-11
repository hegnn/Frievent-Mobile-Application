import {authTypes} from '../types/auth';

const INITAL_STATE = {
  loading: false,
  error: false,
  isLoggedIn: false,
  data: {},
};

export default reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case authTypes.SIGN_IN:
      return {...state, loading: true};
    case authTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: true,
        data: action.payload,
      };
    case authTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        isLoggedIn: false,
        data: action.payload,
      };
    case authTypes.SIGN_UP:
      return {...state, loading: true};
    case authTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: true,
        data: action.payload,
      };
    case authTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        isLoggedIn: false,
        data: action.payload,
      };
    case authTypes.SIGN_OUT:
      return {
        INITAL_STATE,
      };
    default:
      return state;
  }
};
