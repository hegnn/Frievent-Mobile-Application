import { combineReducers } from "redux";
import category from "./category";
import auth from "./auth";
import events from "./events";
import common from "./common";

export default rootReducer = combineReducers({
  auth: auth,
  events: events,
  categories: category,
  common: common,
});
