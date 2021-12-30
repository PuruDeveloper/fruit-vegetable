const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  day: {
    type: Date,
    required: [true, "A date must be provided"],
    default: new Date(),
  },
  fruits: {
    apple: {
      type: Number,
      default: 0,
    },
    banana: {
      type: Number,
      default: 0,
    },
    orange: {
      type: Number,
      default: 0,
    },
    grapes: {
      type: Number,
      default: 0,
    },
  },
  vegetables: {
    potatoes: {
      type: Number,
      default: 0,
    },
    tomatoes: {
      type: Number,
      default: 0,
    },
    onions: {
      type: Number,
      default: 0,
    },
    ladyfinger: {
      type: Number,
      default: 0,
    },
    cauliflower: {
      type: Number,
      default: 0,
    },
  },
});

const Datamodel = mongoose.model("Datamodel", dataSchema);

module.exports = Datamodel;
