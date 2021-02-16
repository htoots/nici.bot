const Discord = require('discord.js');

function getUsersInVoice(voiceChannel) {
  var currentUserList = [];
  for (const [memberID] of voiceChannel.members) currentUserList.push(memberID);
  return currentUserList;
}

function getUsersWithChannel(channelsCache, usersInVoice) {
  returnDict = {};
  usersInVoice.forEach(user => {
    if (checkChannelExists(channelsCache, user)) returnDict[user] = true;
    else returnDict[user] = false;
  });
  return returnDict;
}

function checkChannelExists(channels, userID) {
  var possibleChannel = channels.find(channel => channel.name === userID);
  if (possibleChannel) return true;
  else return false;
}

function createChannel(channels, userID, groupID, serverID, botID) {
  channels.create(userID)
    .then(channel => {
      channel.setParent(groupID);
      channel.overwritePermissions([
        {
          id: serverID,
          deny: 'VIEW_CHANNEL'
        },
        {
          id: userID,
          allow: 'VIEW_CHANNEL'
        },
        {
          id: botID,
          allow: 'VIEW_CHANNEL'
        }
      ], 'Deny everyone from reading channel');
    });
}

function sendMessage(message, logChannel) {
  const embed = createEmbed(message);
  logChannel.send(embed);
}

function createEmbed(message) {
  let embed = new Discord.MessageEmbed();
  embed.setAuthor(message.author.username, message.author.avatarURL());
  embed.setColor('#c5a790');

  if (message.content) embed.setDescription(message.content);

  if (message.attachments.size > 0) {
    if (message.attachments.size > 1) {
      console.log("[ATTACHMENTS] Debug this:");
      console.log(message);
    }
    else {
      message.attachments.each(attachment => {
        embed.setImage(attachment.url);
      });
    }
  }
  return embed;
}

module.exports = {
  checkRole, 
  getUsersInVoice, 
  getUsersWithChannel,
  createChannel,
  sendMessage,
}