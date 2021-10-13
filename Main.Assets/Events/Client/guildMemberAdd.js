const { Message, MessageEmbed, GuildMember } = require("discord.js");
const punitive = require("../../../Database/Schema/Registery/Global.Punitives")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

/**
 * @param { Client } client
 * @param { GuildMember } member
 */


module.exports = async (member) => {
    let embed = new MessageEmbed().setAuthor(sistem.embed.başlık, member.guild.iconURL({dynamic: true})).setFooter(sistem.embed.altbaşlık)
    let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
    if (guvenilirlik) { member.rolTanımla(roller.şüpheliRolü)

    member.guild.channels.cache.get(_channels.welcome).send(`${member} isimli kişi sunucuya katıldı fakat hesabı ${moment(member.user.createdTimestamp).fromNow()} açıldığı için şüpheli üye olarak belirtildi.`)
    member.guild.kanalBul("suspect-main-log").send({ embeds: [embed.setDescription(`${member} isimli kişi sunucuya katıldı fakat hesabı ${moment(member.user.createdTimestamp).fromNow()} açıldığı için şüpheli üye olarak belirtildi.`)]});
  } else {
    member.setNickname(`${member.user.username.includes(sistem.assets.tag) ? sistem.assets.tag : (sistem.assets.tagsızTag ? sistem.assets.tagsızTag : (sistem.assets.tag || ""))} İsim | Yaş`) 
    member.guild.channels.cache.get(_channels.welcome).send(`${sistem.embed.kucukBaslık}'ya hoşgeldin ${member}! Hesabın __${moment(member.user.createdTimestamp).format("LLL")}__ tarihinde oluşturulmuş.\n\nSeninle beraber sunucumuz ${member.guild.memberCount} kişiye ulaşmış bulunmakta!\n\nSunucu kurallarımız <#${_channels.kurallar}> kanalında belirtilmiştir lütfen kurallarımızı okumayı ihmal etme.\n\nTagımızı alarak bizlere destek olabilirsin! Ses teyit için yetkililerimiz seni **Voice Confirmed** kanallarında bekliyor olacak. İyi eğlenceler!`);  
    rolTanımlama(member, roller.kayıt.unregRoles)
    }
}

function rolTanımlama(member, rol) {
    member.rolTanımla(rol).then(x => {
      if(member.user.username.includes(sistem.assets.tag)) { member.roles.add(roller.taglıRolü)
      member.guild.kanalBul("join-family").send({ embeds: [new MessageEmbed().setAuthor(sistem.embed.başlık, member.guild.iconURL({dynamic: true})).setFooter(sistem.embed.altbaşlık).setDescription(`${member} isimli kişi sunucuya taglı bir şekilde katıldı, kullanıcı veritabanında taglı olarak işaretlendi.`)]});
      }
    })
}


module.exports.Options = {
        active: true,
        name: 'guildMemberAdd',
}
