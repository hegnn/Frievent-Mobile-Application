const express = require("express");
const { register, login } = require("../controllers/auth");
const { getCategories } = require("../controllers/category");
const {
  createEvent,
  getEvents,
  getTotalCount,
  getMyEvents,
  joinEvent,
  getAppliedEvents,
  getPastEvents,
} = require("../controllers/event");

const apiRouter = express.Router();

apiRouter.post("/register", register);
apiRouter.post("/login", login);
apiRouter.post("/createEvent", createEvent);
apiRouter.post("/join", joinEvent);
apiRouter.get("/events", getEvents);
apiRouter.get("/myEvents", getMyEvents);
apiRouter.get("/appliedEvents", getAppliedEvents);
apiRouter.get("/pastEvents", getPastEvents);
apiRouter.get("/totalEventCount", getTotalCount);
apiRouter.get("/categories", getCategories);

module.exports = apiRouter;
