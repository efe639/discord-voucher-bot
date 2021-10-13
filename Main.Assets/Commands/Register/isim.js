const { register } = require("../../../Main.Modules/_modules")
const data = _register
const cezapuan = _punish
module.exports = {
    
    name: "isim",
    aliases: ["nick","i"],
    description: "isim",
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
        const isim = args.slice(1).filter((x) => isNaN(x)).map((x) => x.charAt(0).replace(/i/g, "İ").toUpperCase() + x.slice(1)).join(" ");
        const yaş = args.filter((x) => !isNaN(x) && member.id !== x)[0] || undefined;
        if(!isim && !yaş) return message.channel.send(`Lütfen geçerli bir isim yaş belirt.`)

        if (member.user.username.includes(sistem.assets.tag)) {
            await member.setNickname(`${sistem.assets.tag} ${isim} | ${yaş}`);
            if (!member.roles.cache.has(roller.taglıRolü)) await member.roles.add(roller.taglıRolü);
          } else {
            await member.setNickname(`${sistem.assets.tagsızTag} ${isim} | ${yaş}`);
            if (member.roles.cache.has(roller.taglıRolü)) await member.roles.remove(roller.taglıRolü);
          }
          await data.updateOne({ id: member.id }, { $push: { "Isimler": { Yetkili: message.member.id, Zaman: Date.now(), Isim: isim, Yas: yaş, islembilgi: "İsim Güncelleme" } } }, { upsert: true }).exec();
          let isimveri = await data.findOne({ id: member.id }) || [];
          let isimler = isimveri.Isimler.length > 0 ? isimveri.Isimler.reverse().map((value, index) => `\`${sistem.assets.tag} ${value.Isim} | ${value.Yas}\` (${value.islembilgi})`).join("\n") : "";
          message.channel.send({ embeds: [embed.setDescription(`${member} kişisinin ismi başarıyla "${isim} | ${yaş}" olarak değiştirildi
          \n${message.guild.fetchEmoji(_emojis.red_mercy)} Bu kullanıcının ${isimveri.Isimler.length} adet isim geçmişi görüntülendi
      ${isimler}\n\nKişinin önceki isimlerine \`!isimler @Mêrcy/ID\` komutuyla bakarak kayıt işlemini\n gerçekleştirmeniz önerilir.`)
         ]}).then(x => setTimeout(() => { x.delete() }, 14000, message.react(_emojis.green_mercy)))
    }
};