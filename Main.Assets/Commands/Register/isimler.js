const { MessageEmbed } = require("discord.js")
const { register } = require("../../../Main.Modules/_modules")
const data = _register
const cezapuan = _punish
module.exports = {
    
    name: "isimler",
    aliases: ["isimler"],
    description: "belirtilen kullanıcının geçmiş isimlerini listeler.",
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

      let isimveri = await data.findOne({ id: member.id }) || [];
      if(isimveri.Isimler) {
      let isimler = isimveri.Isimler.length > 0 ? isimveri.Isimler.reverse().map((value, index) => `\`${sistem.assets.tag} ${value.Isim} | ${value.Yas}\` (${value.islembilgi})`).join("\n") : "";
    message.channel.send({ embeds: [embed.setDescription(`${member} kişisinin ${isimveri.Isimler.length || 0} adet isim geçmişi görüntülendi\n${isimler}`)]}).then(x => setTimeout(() => { x.delete() }, 14000, message.react(_emojis.green_mercy)))
      } else {
           message.channel.send({ embeds: [embed.setDescription(`${member} kişisinin veritabanında isim kaydı bulunamadı.`).setFooter(sistem.embed.altbaşlık)]}).then(x => setTimeout(() => { x.delete() }, 9000, message.react(_emojis.red_mercy)))
       }
    }
};