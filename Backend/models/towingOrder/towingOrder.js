const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const towingOrderSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true },
    orderDate: { type: Date, default: new Date(), required: true },
    orderTime: { type: String, required: true },
    serviceName: { type: String, required: true },
    ahmashNotes: { type: String, default: "" },
    clientJourney: [Object],
    carnumber: { type: String, required: true },
    erorrInfo: { type: Array },
    errInfoOther: { type: String, required: true },
    location: { type: String },
    garage: { type: ObjectId, required: true },
    fullName: { type: String },
    phoneNumber: { type: String },
    otherPhoneNumber: { type: String },
    transferOrderDate: { type: Date },
    transferOrderTime: { type: String },
    reciveName: { type: String },
    executiveBody: { type: String },
    turnNumber: {type: String},
    demandDate: { type: Date },
    area: { type: String },
    status: { type: String },
    commanderNotes: { type: String },
  },
  { timestamps: true }
);

const TowingOrders = mongoose.model("towingorders", towingOrderSchema);

module.exports = TowingOrders;
