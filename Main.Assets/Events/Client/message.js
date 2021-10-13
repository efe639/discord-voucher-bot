const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms")
const waitCommand = new Set();

 /**
 * @param {Message} message 
 */


module.exports = async (message) => {
    if (message.author.bot || !global.sistem.prefix.some(x => message.content.startsWith(x)) || !message.channel || message.channel.type == "dm") return;
    let args = message.content.substring(global.sistem.prefix.some(x => x.length)).split(" ")
    let commandOn = message.client.commands.get(args[0]) || message.client.aliases.get(args[0]);
    args = args.splice(1);
    let uye = message.guild.members.cache.get(message.member.id) || message.author;
    let embed = new MessageEmbed().setFooter(sistem.embed.altbaşlık).setAuthor(sistem.embed.başlık, message.guild.iconURL({dynamic: true}))
    if(commandOn) {
  
    if (blockedFromCommand.includes(message.author.id)) return
    let owners = sistem.Owner
    if (!owners.includes(message.author.id)) {
      let blockArr = client.commandBlock.get(message.author.id) || []
      let datax = {
        içerik: message.content,
        kanal: message.channel.name,
        kanalID: message.channel.id,
        komut: commandOn.name
      }
      blockArr.push(datax)
      client.commandBlock.set(message.author.id, blockArr)
      if (blockArr.length == 10) {
        message.channel.send(`${message.author} kötüye kullanım tespit edildi, komut kullanımların kapatılmıştır!`)  
        blockedFromCommand.push(message.author.id)
        logger.log(`${message.author.tag} (${message.author.id}) kullanıcısı komut engeli aldı!`, "block", message.guild.channels.cache.get(_channels.cmdBlockeds), message.author);
     }

    setTimeout(() => { if (client.commandBlock.has(message.author.id)) { client.commandBlock.delete(message.author.id) } }, ms("999m")) // komutla kaldırdığım için ellemeyin buraya
    }
        if(commandOn.permissions && commandOn.permissions.length) {
            if(commandOn.permissions.includes("OWNER")) {
                if(!sistem.Owner.some(id => uye.id == id)) return message.channel.send(global.reply.noPerms);
            } else {
                if(!sistem.Owner.some(id => uye.id == id) && !commandOn.permissions.some(x => uye.roles.cache.has(x)) && !uye.permissions.has('ADMINISTRATOR')) 
                return;
            }
        };
        
        if(!sistem.Owner.some(id => uye.id == id) && !uye.permissions.has('ADMINISTRATOR')) waitCommand.add(uye.id);
         commandOn.onRequest(message.client, message, args, embed) 

          setTimeout(() => { waitCommand.delete(uye.id) }, 3000);
        
    }
}

module.exports.Options = {
        active: true,
        name: 'messageCreate',
}