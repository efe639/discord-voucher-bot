const { Schema, model } = require("mongoose");

const schema = Schema({
  No: Number,
  Guild: String,
  Member: String,
  Staff: String,
  Type: String,
  Reason: String,
  Duration: Date,
  Date: Date,
  Expried: Date,
  Remover: String,
  Active: { type: Boolean, default: true},
  cezapuan: { type: Number, default: 0 },
});

module.exports = model("cezapuan", schema);
