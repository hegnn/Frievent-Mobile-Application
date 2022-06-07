const Event = require("../models/Event");
const mongoose = require("mongoose");

module.exports.createEvent = async (req, res, next) => {
  const {
    ownerId,
    title,
    description,
    location,
    date,
    limit,
    categoryId,
    color,
  } = req.body;
  const { userid } = req.headers;
  let createdEvent = null;
  try {
    createdEvent = new Event({
      ownerId,
      categoryId,
      title,
      description,
      location,
      date,
      limit,
      color,
    });
    await createdEvent.save();
    res.status(201).send({
      data: { createdEvent },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getEvents = async (req, res, next) => {
  const { sortKey, sortValue, offset } = req.query;
  const { userid } = req.headers;
  console.log("sortKey", sortKey);
  console.log("sortValue", sortValue);

  var sort = {};
  sort[sortKey] = Number(sortValue);

  const today = new Date();

  try {
    const events = await Event.aggregate([
      {
        $match: {
          $and: [
            { ownerId: { $ne: mongoose.Types.ObjectId(userid) } },
            { date: { $gt: today } },
          ],
        },
      },
      { $sort: sort },
      {
        $skip: Number(offset),
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $addFields: { categoryName: "$category.name" } },
      { $unset: ["category", "categoryId"] },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $unset: [
          "owner.password",
          "owner.email",
          "owner.phoneNumber",
          "owner.gender",
        ],
      },
    ]);
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getTotalCount = async (req, res, next) => {
  try {
    const count = await Event.count();
    //console.log("COUNT", events);
    res.send({ count: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getMyEvents = async (req, res, next) => {
  const { filter, offset } = req.query;
  const { userid } = req.headers;
  console.log(userid);
  try {
    const events = await Event.aggregate([
      {
        $match: {
          $and: [{ ownerId: { $eq: mongoose.Types.ObjectId(userid) } }],
        },
      },
      { $sort: { _id: -1 } },
      {
        $skip: Number(offset),
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $addFields: { categoryName: "$category.name" } },
      { $unset: ["category", "categoryId"] },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $unset: [
          "owner.password",
          "owner.email",
          "owner.phoneNumber",
          "owner.gender",
        ],
      },
    ]);
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getAppliedEvents = async (req, res, next) => {
  const { filter, offset } = req.query;
  const { userid } = req.headers;
  console.log("body", userid);
  const today = new Date();

  try {
    const events = await Event.aggregate([
      {
        $match: {
          $and: [
            {
              participants: {
                $elemMatch: {
                  $and: [{ userId: mongoose.Types.ObjectId(userid) }],
                },
              },
            },
            { date: { $gt: today } },
          ],
        },
      },
      { $sort: { _id: -1 } },
      {
        $skip: Number(offset),
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $addFields: { categoryName: "$category.name" } },
      { $unset: ["category", "categoryId"] },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $unset: [
          "owner.password",
          "owner.email",
          "owner.phoneNumber",
          "owner.gender",
        ],
      },
    ]);
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getPastEvents = async (req, res, next) => {
  const { filter, offset } = req.query;
  const { userid } = req.headers;
  console.log("body", userid);

  const today = new Date();
  try {
    const events = await Event.aggregate([
      {
        $match: {
          $and: [
            {
              participants: {
                $elemMatch: {
                  $and: [{ userId: mongoose.Types.ObjectId(userid) }],
                },
              },
            },
            { date: { $lt: today } },
          ],
        },
      },
      { $sort: { _id: -1 } },
      {
        $skip: Number(offset),
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      { $addFields: { categoryName: "$category.name" } },
      { $unset: ["category", "categoryId"] },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $unset: [
          "owner.password",
          "owner.email",
          "owner.phoneNumber",
          "owner.gender",
        ],
      },
    ]);
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.joinEvent = async (req, res, next) => {
  const { filter, eventId, user } = req.body;
  const { userid } = req.headers;
  console.log("DENEME", user);
  try {
    const join = await Event.updateOne(
      { _id: eventId },
      {
        $push: { participants: { userId: user } },
      }
    );

    res.status(200).send(join);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
