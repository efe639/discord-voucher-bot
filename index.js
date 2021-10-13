const { Intents } = require('discord.js')
const { mercy, Mongo } = require('./main_client');

const client = global.client = new mercy({ 
    fetchAllMembers: true,
    intents: 32767
});

client.fetchCommands()
client.fetchEvents()
// client.fetchSlashCommands()

Mongo.Connect()
client.login(sistem.token).catch(err => { console.log("[TOKEN]: ARIZALI.")})