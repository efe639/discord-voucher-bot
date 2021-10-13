const mongoose = require("mongoose");

const schema = mongoose.model('register', new mongoose.Schema({
    id: String,
    Isim: String,
    Yas: String,
    Cinsiyet: String,
    Yetkili: String,
    Toplamteyit: {type: Number, default: 0},
    Teyitler: {type: Array, default: []},
    Isimler: { type: Array, default: []},
}));

module.exports = schema;