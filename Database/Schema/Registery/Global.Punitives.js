const mongoose = require("mongoose");

const schema = mongoose.model('Punitive', new mongoose.Schema({
    guildID: String,
    CezaID: String,
    userID: String,
    Type: String,
    Staff: String,
    Reason: String,
    DateNow: Number,
    bannedTags: String, 
    Active: { type: Boolean, default: false},
    PunishPoint: Number,
    FinishDate: { type: Number, default: "0" }
}));

module.exports = schema;