const { Client, Collection, GuildMember, Guild, TextChannel, Message, MessageEmbed } = require('discord.js');
const fs = require('fs')


class mercy extends Client {
    constructor(options) {
        super(options);

        // Register
        this._register = global._register = require("./Database/Schema/Registery/Staff.Register")
        this._punish = global._punish = require("./Database/Schema/Registery/Staff.Punitives")
        
        // Gerekli
        this.sistem = global.sistem = require('./Main.Assets/Configs/_settings');
        this.reply = global.reply = require('./Main.Assets/Configs/_reply');
        this.roller = global.roller = require("./Main.Assets/Configs/_roles")
        this._emojis = global._emojis = require("./Main.Assets/Configs/_emojis")
        this._channels = global._channels = require('./Main.Assets/Configs/_channels');
        this.logger = global.logger = require("./Main.Modules/logger")
        this.blockedFromCommand = global.blockedFromCommand = []
        this.commandBlock = global.commandBlock = new Map();
        this.slashCommands = new Collection()
        this.commands = new Collection()
        this.aliases = new Collection()
        // Gerekli

        this.on("ready", () => { this.user.setPresence({ activities: [{ name: 'Allah-u Teala ❤️ Mêrcy.', type: "COMPETING" }] }), console.log(`${client.user.username} ismi ile giriş yapıldı.`), 
        this.guilds.cache.forEach(guild => { guild.invites.fetch().then(sex => { _Invites.set(guild.id, sex);
        }).catch(err => { });
    })}
)}

    async fetchCommands() {
        let dirs = fs.readdirSync("./Main.Assets/Commands", { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./Main.Assets/Commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let reference = require(`./Main.Assets/Commands/${dir}/${file}`);
                if(reference.onLoad != undefined && typeof reference.onLoad == "function") reference.onLoad(this);
                if(!reference.active) return;
                this.commands.set(reference.name, reference);
                if (reference.aliases) reference.aliases.forEach(alias => this.aliases.set(alias, reference));
            });
        });
    }

    async fetchSlashCommands() {
        const arrayOfSlashCommands = [];
        let dirs = fs.readdirSync("./Main.Assets/Commands", { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./Main.Assets/Commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let reference = require(`./Main.Assets/Commands/${dir}/${file}`);
                if(reference.onLoad != undefined && typeof reference.onLoad == "function") reference.onLoad(this);
                if(!reference.slash) return;
                this.slashCommands.set(reference.name, reference);
                if (reference.aliases) reference.aliases.forEach(alias => this.aliases.set(alias, reference));
                arrayOfSlashCommands.push(reference);
                this.on("ready", () => { this.application.commands.set(arrayOfSlashCommands)})   
            });
        });
    }
    

    async fetchEvents() {
        let dirs = fs.readdirSync("./Main.Assets/Events", { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./Main.Assets/Events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let reference = require(`./Main.Assets/Events/${dir}/${file}`);
                if(!reference.Options.active) return;
                global.client.on(reference.Options.name, reference);
            });
        });
    }
}

class Mongo {
    static Connect() {
        require('mongoose').connect(require('./Main.Assets/Configs/_settings').MongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("[Mongoosee] Bağlantı Başarıyla Kuruldu!")
        }).catch((err) => {
            console.log("MongoDB veritabanına bağlantı sağlanamadı!\n" + err, "error");
        });
    }

}


GuildMember.prototype.kayıtRolVer = function (rolidler = []) {
    let rol;
    if(this.roles.cache.has(roller.vipRolü)) { 
    rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler).concat(roller.vipRolü) 
    } else {
    rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler)
    };
    return this.roles.set(rol);
}

GuildMember.prototype.rolTanımla = function (rolidler = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler);
    return this.roles.set(rol);
}

Guild.prototype.kanalBul = function(kanalisim) {
    let kanal = this.channels.cache.find(k => k.name === kanalisim)
    return kanal;
}

Guild.prototype.rolBul = function(rolisim) {
    let rol = this.roles.cache.find(r => r.name === rolisim)
    return rol;
}

Guild.prototype.kayıtLog = async function kayıtLog(yetkili, üye, cins, channelName) {
    let kanal = this.channels.cache.find(k => k.name === channelName);
    let cinsiyet;
    if(cins === "erkek") { cinsiyet = "Erkek" } else if(cins === "kadın") { cinsiyet = "Kadın" }
    if(kanal) {
        let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, client.guilds.cache.get(ayarlar.sunucuID).iconURL({dynamic: true, size: 2048})).setColor(ayarlar.embed.renk).setDescription(`${üye} isimli üye **${tarihsel(Date.now())}** tarihinde ${yetkili} tarafından **${cinsiyet}** olarak kayıt edildi.`).setFooter(ayarlar.embed.altbaşlık)
        kanal.send(embed)
    };
}

Guild.prototype.fetchEmoji = function(emojiid) {
    let emoji = this.emojis.cache.get(emojiid)
    return emoji;
}

GuildMember.prototype.setRoles = async function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

module.exports = { mercy, Mongo }