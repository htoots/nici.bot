const directMessageHandler = require('../handlers/directMessageHandler');
const logger = require('../functions/logger');
const userFuncs = require('../functions/userFuncs');

const {MessageData} = require('../data/eventData');

module.exports = message => {
  if (message.author.bot) return;
  logger.messageLogger(message);
  if (message.channel.type === 'dm' && message.client.credentials.ownerId.indexOf(message.author.id) >= 0)
    directMessageHandler(message);
  if (message.channel.id === message.client.config.goldenData.textChannelID) {

    let messageData = new MessageData(message);

    let voiceChannel = messageData.channels.cache.get(messageData.voiceChannelID);
    let usersInVoice = userFuncs.getUsersInVoice(voiceChannel);
    let usersWithChannelDict = userFuncs.getUsersWithChannel(messageData.channels.cache, usersInVoice);

    for (let [key, value] of Object.entries(usersWithChannelDict)) {
      if (value === false) {
        console.log(`Creating channel : ${key}`);
        userFuncs.createChannel(messageData.channels, key, messageData.groupID, messageData.guildID, messageData.botID);
        usersWithChannelDict[key] = true;
      }
    }

    for (let [key, value] of Object.entries(usersWithChannelDict)) {
      if (value === true) {
        let usersChannel = messageData.channels.cache.find(channel => channel.name === key);
        if (usersChannel != undefined) 
          userFuncs.sendMessage(message, usersChannel);
        else
          console.log(`[SEND-UNDEFINED]${key}`);
      }
    }
  }
}