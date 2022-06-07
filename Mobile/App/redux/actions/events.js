import axios from "axios";
import { eventTypes } from "../types/events";

export const createEvent = (payload) => async () => {
  try {
    console.log(payload);
    const response = await axios.post(
      "http://192.168.0.11:3000/createEvent",
      payload
    );
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getEvents = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    dispatch({ type: eventTypes.GET_EVENTS });
    const response = await axios.get("http://192.168.0.11:3000/events", {
      params: payload,
    });
    console.log("response", response);
    dispatch({ type: eventTypes.GET_EVENTS_SUCCESS, payload: response.data });
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch({ type: eventTypes.GET_EVENTS_FAILURE, payload: error });
    return error;
  }
};

export const getCreatedEvents = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    dispatch({ type: eventTypes.GET_CREATED_EVENTS });
    const response = await axios.get("http://192.168.0.11:3000/myEvents", {
      params: payload,
    });
    console.log("response", response);
    dispatch({
      type: eventTypes.GET_CREATED_EVENTS_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch({ type: eventTypes.GET_CREATED_EVENTS_FAILURE, payload: error });
    return error;
  }
};

export const getAppliedEvents = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    dispatch({ type: eventTypes.GET_APPLIED_EVENTS });
    const response = await axios.get("http://192.168.0.11:3000/appliedEvents", {
      params: payload,
    });
    console.log("response", response);
    dispatch({
      type: eventTypes.GET_APPLIED_EVENTS_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch({ type: eventTypes.GET_APPLIED_EVENTS_FAILURE, payload: error });
    return error;
  }
};

export const getPastEvents = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    dispatch({ type: eventTypes.GET_PAST_EVENTS });
    const response = await axios.get("http://192.168.0.11:3000/pastEvents", {
      params: payload,
    });
    console.log("response", response);
    dispatch({
      type: eventTypes.GET_PAST_EVENTS_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch({ type: eventTypes.GET_PAST_EVENTS_FAILURE, payload: error });
    return error;
  }
};

export const joinEvent = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    dispatch({ type: eventTypes.JOIN_EVENT });
    const response = await axios.post("http://192.168.0.11:3000/join", payload);
    console.log("response", response);
    dispatch({ type: eventTypes.JOIN_EVENT_SUCCESS });

    return response;
  } catch (error) {
    console.log("error", error);
    dispatch({ type: eventTypes.JOIN_EVENT_FAILURE });
    return error;
  }
};
