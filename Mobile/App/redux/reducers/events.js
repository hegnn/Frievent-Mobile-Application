import { act } from "react-test-renderer";
import { eventTypes } from "../types/events";

const INITAL_STATE = {
  hasMore: false,
  events: {
    data: [],
    loading: false,
    error: false,
    totalCount: 0,
    hasMore: false,
  },
  createdEvents: {
    data: [],
    loading: false,
    error: false,
    totalCount: 0,
    hasMore: false,
  },
  appliedEvents: {
    data: [],
    loading: false,
    error: false,
    totalCount: 0,
    hasMore: false,
  },
  pastEvents: {
    data: [],
    loading: false,
    error: false,
    totalCount: 0,
    hasMore: false,
  },
  joinEvent: {
    data: [],
    loading: false,
    error: false,
  },
};

export default reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    //CREATE EVENT START
    case eventTypes.CREATE_EVENT:
      return { ...state, loading: true };
    //CREATE EVENT END

    //GET EVENTS START
    case eventTypes.GET_EVENTS:
      return {
        ...state,
        events: { ...state.events, loading: true, error: false },
      };
    case eventTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: {
          ...state.events,
          loading: false,
          error: false,
          hasMore: action.payload.length === 1,
          data: [...state.events.data, ...action.payload],
        },
      };
    case eventTypes.GET_EVENTS_FAILURE:
      return {
        ...state,
        events: { ...state.events, loading: false, error: true },
      };
    //GET EVENTS END

    //GET_CREATED_EVENTS START
    case eventTypes.GET_CREATED_EVENTS:
      return {
        ...state,
        createdEvents: { ...state.createdEvents, loading: true, error: false },
      };
    case eventTypes.GET_CREATED_EVENTS_SUCCESS:
      return {
        ...state,
        createdEvents: {
          data: [...state.createdEvents.data, ...action.payload],
          loading: true,
          error: false,
          hasMore: action.payload.length === 1,
        },
      };
    case eventTypes.GET_CREATED_EVENTS_FAILURE:
      return {
        ...state,
        createdEvents: { ...state.createdEvents, loading: false, error: true },
      };
    //GET_CREATED_EVENTS END

    //GET_APPLIED_EVENTS START
    case eventTypes.GET_APPLIED_EVENTS:
      return {
        ...state,
        appliedEvents: { ...state.appliedEvents, loading: true, error: false },
      };
    case eventTypes.GET_APPLIED_EVENTS_SUCCESS:
      return {
        ...state,
        appliedEvents: {
          data: [...state.appliedEvents.data, ...action.payload],
          loading: true,
          error: false,
          hasMore: action.payload.length === 1,
        },
      };
    case eventTypes.GET_APPLIED_EVENTS_FAILURE:
      return {
        ...state,
        appliedEvents: { ...state.appliedEvents, loading: false, error: true },
      };
    //GET_APPLIED_EVENTS END

    //GET_APPLIED_EVENTS START
    case eventTypes.GET_PAST_EVENTS:
      return {
        ...state,
        pastEvents: { ...state.pastEvents, loading: true, error: false },
      };
    case eventTypes.GET_PAST_EVENTS_SUCCESS:
      return {
        ...state,
        pastEvents: {
          data: [...state.pastEvents.data, ...action.payload],
          loading: true,
          error: false,
          hasMore: action.payload.length === 1,
        },
      };
    case eventTypes.GET_PAST_EVENTS_FAILURE:
      return {
        ...state,
        pastEvents: { ...state.pastEvents, loading: false, error: true },
      };
    //GET_APPLIED_EVENTS END

    case eventTypes.JOIN_EVENT:
      return {
        ...state,
        joinEvent: { ...state.joinEvent, loading: true, error: false },
      };
    case eventTypes.JOIN_EVENT_SUCCESS:
      return {
        ...state,
        joinEvent: { ...state.joinEvent, loading: false, error: false },
      };
    case eventTypes.GET_CREATED_EVENTS_FAILURE:
      return {
        ...state,
        joinEvent: { ...state.joinEvent, loading: false, error: true },
      };

    default:
      return state;
  }
};
