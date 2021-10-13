let registerData = _register
let data = require("../Database/Schema/Registery/Global.Punitives")

class register {
    
    static async kayıtBelirt(uye, isim, yas, yetkili, islemismi, cinsiyet) {
        await registerData.updateOne({ id: yetkili.id } , { $inc: { "Toplamteyit": 1 } }, { upsert: true }).exec();
        await registerData.updateOne({ id: yetkili.id }, { $push: {"Teyitler": { Uye: uye.id, Cinsiyet: cinsiyet, Zaman: Date.now() }}}, { upsert: true }).exec();
        await registerData.updateOne({ id: uye.id }, { $push: { "Isimler": { Yetkili: yetkili.id, Zaman: Date.now(), Isim: isim, Yas: yas, islembilgi: islemismi } } }, { upsert: true }).exec();
        await registerData.updateOne({ id: uye.id }, { $set: { "Cinsiyet": cinsiyet, "Isim": isim, "Yas": yas, "Yetkili": yetkili.id } }, { upsert: true }).exec();
    }
}



async function GetUser(id) {
    try {
        return await global.client.users.fetch(id);
    } catch (error) {
        return undefined;
    }
};

module.exports = { register, GetUser }