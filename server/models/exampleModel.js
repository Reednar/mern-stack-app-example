// server/models/exampleModel.js

const mongoose = require("mongoose");

const ExampleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Example = mongoose.model("Example", ExampleSchema); // "examples" collection

module.exports = Example;

// Example of a model
// const ExampleSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   price: Number,
//   quantity: Number,
//   image: String,
//   category: String,
//   isCompleted: {
//     type: Boolean,
//     default: false,
//   },
// });
