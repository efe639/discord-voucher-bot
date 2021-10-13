const { MessageEmbed } = require('discord.js')
const chalk = require("chalk");
const moment = require("moment");
moment.locale("tr")

class Logger {
  static log (content, type = "log", channel, author) {
    moment.locale("tr")
    const timestamp = `[${moment(Date.now() + 10800000).format("LLL")}]:`;
    switch (type) {
      case "log": {
        return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
      }
      case "warn": {
        return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "error": {
        return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
      }
      case "debug": {
        return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
      }
      case "cmd": {
        return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "ready": {
        return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
      } 
      case "block": {
        let embed = new MessageEmbed().setAuthor(sistem.embed.başlık, sistem.embed.iconURL).setFooter(sistem.embed.altbaşlık).setDescription(`${author} kullanıcısı komut engeli aldı, kullanıcının komut kullanımlarını listelemek için \`!cmdlist <User>\`komutunu kullanın.`)
        channel.send({ embeds: [embed]})
        return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content}`);
      } 
      default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    } 
  }
  
  static error (content) {
    return this.log(content, "error");
  }
  
  static warn (content) {
    return this.log(content, "warn");
  }
  
  static debug (content) {
    return this.log(content, "debug");
  } 
  
  static cmd (content) {
    return this.log(content, "cmd");
  } 
}

module.exports = Logger;
