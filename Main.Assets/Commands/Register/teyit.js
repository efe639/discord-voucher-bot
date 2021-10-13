const { Client, Message, MessageEmbed} = require("discord.js");
const { register } = require("../../../Main.Modules/_modules")
const data = _register
const cezapuan = _punish
module.exports = {
    
    name: "teyit",
    aliases: ["teyitlerim"],
    description: "",
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

    onRequest: async function (client, message, args) {
    if(!message.member.roles.cache.has(roller.kayıt.staff) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(reply.noPerms)
    let embed = new MessageEmbed().setAuthor(sistem.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(sistem.embed.renk)
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    if (!member) return message.channel.send(reply.notMember);
    let teyit = await data.findOne({ id: member.id }) || [];
    let teyitBilgisi;
    if(teyit.Teyitler){
      let erkekTeyit = teyit.Teyitler.filter(v => v.Cinsiyet === "erkek").length
      let kizTeyit = teyit.Teyitler.filter(v => v.Cinsiyet === "kadın").length
      teyitBilgisi = `${member} kullanıcısı toplam ${erkekTeyit+kizTeyit} kayıt işlemi yapmış. (**${erkekTeyit}** erkek, **${kizTeyit}** kadın)\n`;
    } else { 
      teyitBilgisi = `${member} isimli kullanıcının teyit verisi veritabanında bulunamadı.`
    }
    message.channel.send({ embeds: [embed.setDescription(`${teyitBilgisi}`).setFooter(sistem.embed.altbaşlık)]});
    }
};