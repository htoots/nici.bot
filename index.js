const Discord = require('discord.js');

const Nici = new Discord.Client();

Nici.credentials = require('./creds.json');
Nici.config = require('./config.json');

Nici.commands = new Discord.Collection();
Nici.aliases = new Discord.Collection();
Nici.functions = {};

require('./handlers/logHandler')(Nici);
require('./handlers/eventHandler')(Nici);
Nici.login(Nici.credentials.token).catch(e => {
  Nici.log.error(e.stack);
});

process.on('unhandledRejection', rejection => {
  console.warn('\n[unhandledRejection]\n', rejection, '\n[/unhandledRejection]\n');
});
