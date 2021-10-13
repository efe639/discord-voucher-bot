const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale("tr")
const { register } = require("../../../Main.Modules/_modules")
const dattabase = _register
const cezapuan = _punish
module.exports = {
    
    name: "kayıtsız",
    aliases: ["unreg","ks","unregister"],
    description: "belirtilen kullanıcıyı kayıtsıza atar.",
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
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(reply.notMember).then(x => setTimeout(() => { x.delete() }, 11000))
        if(message.author.id === member.id) return message.channel.send(reply.self)
        if(member.user.bot) return message.channel.send(reply.bots);
        if(!member.manageable) return message.channel.send(reply.manageable)

        if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(reply.yetkiust)
        if(member.roles.cache.has(roller.kayıt.unregRoles)) return message.channel.send(reply.unregistered)
        let sebep = args.splice(1).join(" ") || "belirtilmedi"

        member.setNickname(`${member.user.username.includes(sistem.assets.tag) ? sistem.assets.tag : (sistem.assets.tagsızTag ? sistem.assets.tagsızTag : (sistem.assets.tag || ""))} İsim | Yaş`)
        member.roles.set(roller.kayıt.unregRoles)
        if(member.voice.channel) member.voice.kick()
        let data = await dattabase.findOne({id: member.id});
        if(data) {
        await dattabase.updateOne({ id: member.id }, { $push: { "Isimler": { Yetkili: message.member.id, Zaman: Date.now(), Isim: data.Isim, Yas: data.Yas, islembilgi: "Kayıtsıza Atıldı" } } }, { upsert: true }).exec();
        await dattabase.updateOne({ id: member.id }, { $set: { "Cinsiyet": new String } }, { upsert: true }).exec();
        };
        message.react(_emojis.green_mercy)
        message.channel.send({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından __${moment(Date.now()).format("LLL")}__ tarihinde __${sebep}__ nedeniyle kayıtsıza atıldı.`)]}).then(x => setTimeout(() => { x.delete() }, 11000))
        message.guild.kanalBul("achievements-main-log").send({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından __${moment(Date.now()).format("LLL")}__ tarihinde __${sebep}__ nedeniyle kayıtsıza atıldı.`)]})
    }
};