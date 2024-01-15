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
    erorrInfo: { type: Array, required: true },
    errInfoOther: { type: String },
    location: { type: String, required: true },
    garage: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String },
    otherPhoneNumber: { type: String },
    transferOrderDate: { type: Date },
    transferOrderTime: { type: String },
    reciveName: { type: String },
    executiveBody: { type: String, required: true },
    turnNumber: { type: String },
    demandDate: { type: Date },
    area: { type: String },
    status: { type: String },
    commanderNotes: { type: String },
  },
  { timestamps: true }
);

const TowingOrders = mongoose.model("towingorders", towingOrderSchema);

module.exports = TowingOrders;
