const { MessageEmbed, Message } = require('discord.js')
const { register } = require("../../../Main.Modules/_modules")
const statics = require("../../../Database/Schema/Registery/Global.Statics")
const data = _register
const cezapuan = _punish
module.exports = {
    
    name: "erkek",
    aliases: ["e"],
    description: "belirtlen kullanıcıyı erkek olarak kayıt eder.",
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
        if(sistem.assets.taglıalım && !member.user.username.includes(sistem.assets.tag) && !member.roles.cache.has(roller.boosterRolü) && !member.roles.cache.has(roller.vipRolü) && !message.member.hasPermission('ADMINISTRATOR') && !roller.üstYonetim.some(xd => message.member.roles.cache.has(xd))) return message.channel.send(reply.taglıAlım).then(x => setTimeout(() => { x.delete() }, 13000, message.react(_emojis.red_mercy)))
        const isim = args.slice(1).filter((x) => isNaN(x)).map((x) => x.charAt(0).replace(/i/g, "İ").toUpperCase() + x.slice(1)).join(" ");
        const yaş = args.filter((x) => !isNaN(x) && member.id !== x)[0] || undefined;
        if(!isim && !yaş) return message.channel.send(reply.isimYaş)

        const cezapuanData = await cezapuan.findOne({ Guild: message.guild.id, Staff: member.user.id });
        let schwetz = cezapuanData ? cezapuanData.cezapuan : 0
        if (schwetz >= sistem.maxCeza && !message.member.roles.cache.has(roller.üstYonetim) && !message.member.permissions.has("ADMINISTRATOR")) {
        message.react(_emojis.red_mercy)
        message.channel.send({ embeds: [embed.setDescription(`${member} üyesinin **${schwetz}** ceza puanı bulunuyor bundan ötürü kayıt işlemi iptal edildi, eğer itirazınız varsa üst yetkililerimize ulaşabilirsiniz.`)]}).then(x => setTimeout(() => { x.delete()}, 14000))
        } else {
        if (member.user.username.includes(sistem.assets.tag)) {
            await member.setNickname(`${sistem.assets.tag} ${isim} | ${yaş}`);
            if (!member.roles.cache.has(roller.taglıRolü)) await member.roles.add(roller.taglıRolü);
          } else {
            await member.setNickname(`${sistem.assets.tagsızTag} ${isim} | ${yaş}`);
            if (member.roles.cache.has(roller.taglıRolü)) await member.roles.remove(roller.taglıRolü);
          }
        kayıtYap(member, message.member, isim, yaş, "erkek")
        
        let isimveri = await data.findOne({ id: member.id }) || [];
        if(isimveri.Isimler) {
        let isimler = isimveri.Isimler.length > 0 ? isimveri.Isimler.reverse().map((value, index) => `\`${sistem.assets.tag} ${value.Isim} | ${value.Yas}\` (${value.islembilgi})`).join("\n") : "";
        if(isimveri.Isimler.length >= 1) { let messagesex = embed.setDescription(`${member} adlı üye başarılı bir şekilde Erkek olarak kaydedildi\n
        Bu kullanıcının ${isimveri.Isimler.length || 0} adet isim geçmişi görüntülendi\n${isimler}`)
        message.channel.send({embeds: [messagesex]}).then(x => setTimeout(() => { x.delete() }, 14000, message.react(_emojis.green_mercy)))
    }} else {
        let messagesex2 = embed.setDescription(`${member} adlı üye başarılı bir şekilde Erkek olarak kayıt edildi.`)
        message.channel.send({embeds: [messagesex2]}).then(x => setTimeout(() => { x.delete() }, 14000, message.react(_emojis.green_mercy)))
        welcMessage(member)
    }


async function kayıtYap(uye, yetkili, isim, yaş, cinsiyet) {
    let rol;
    let rolver;
    if(cinsiyet === "erkek") {
        rol = roller.kayıt.erkekRolü
        rolver = roller.kayıt.erkekRoles
    } else if(cinsiyet == "kadın") {
        rol = roller.kayıt.kadınRolü
        rolver = roller.kayıt.kadınRoles
    }
    await member.kayıtRolVer(rolver);
    await register.kayıtBelirt(uye, isim, yaş, yetkili, `<@&${rol}>`, cinsiyet)
}

async function welcMessage(member) {
    message.guild.channels.cache.get(_channels.generalChat).send(`${member} üyesi aramıza katıldı ona bir hoşgeldin diyelim ve seninle birlikte topluluğumuz ${message.guild.memberCount} kişi oldu!`)
    .then(x => setTimeout(() => { x.delete() }, 14000))
}
    }}}