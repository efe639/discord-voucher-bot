const { register } = require("../../../Main.Modules/_modules")
const data = _register
const cezapuan = _punish
module.exports = {
    
    name: "top-teyit",
    aliases: ["topteyit"],
    description: "top-teyit",
    permissions: [],
    category: ["Register"],
    active: true,

    /**
    * @param {Client} client 
    */
   
    onLoad: function (client) {

    },

    /**
    * @param {Client} client 
    * @param {Message} message 
    * @param {Array<String>} args 
    */

    onRequest: async function (client, message, args, embed) {
        if(!message.member.roles.cache.has(roller.kayıt.staff) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(reply.noPerms)
        const all = await data.find().sort({ Toplamteyit: "descending" });
        let toplam = all.map(x => x.Toplamteyit).reduce((a, b) => a + b, 0)
        let teyit = all.map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value.id)} » **${value.Teyitler.filter(v => v.Cinsiyet === "erkek").length + value.Teyitler.filter(v => v.Cinsiyet === "kadın").length}** kayıt`).slice(0, 20)
        let teyitxd = await data.findOne({ id: message.author.id }) || [];
        let teyitBilgisi;
        if(teyitxd.Teyitler) {
          let erkekTeyit = teyitxd.Teyitler.filter(v => v.Cinsiyet === "erkek").length
          let kizTeyit = teyitxd.Teyitler.filter(v => v.Cinsiyet === "kadın").length
          message.react(_emojis.green_mercy)
          message.channel.send({ embeds: [embed.setTitle(`Teyit Sıralaması`).setDescription(`${message.guild.fetchEmoji(_emojis.green_mercy)} Sunucumuzda ${toplam} kayıt işlemi yapılmıştır, en çok kayıt yapan kişiler aşağıda belirtilmiştir. Toplam **${erkekTeyit}** erkek, **${kizTeyit}** kadın kayıt işlemi yapmışsınız.\n\n${teyit.join("\n") || "Teyit verisi bulunamadı!"}`)]})
        } else
        message.channel.send(`Hata: Sunucumuzda herhangi bir kayıt verisi bulunmuyor.`)
    }
};