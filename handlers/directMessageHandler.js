const Discord = require('discord.js');

const {DirectMessageEvent} = require('../data/directMessageEvent');

module.exports = async message => {

  if (message.client.credentials.ownerId.indexOf(message.author.id) < 0) {
    message.author.send("u dont have rights for this.");
    console.log(`User ${message.author.id} did not have rights to DM`);
  }
  else {
    if (message.content.startsWith(`${message.client.config.prefix}r`)) {

      var directMessageEvent = new DirectMessageEvent(message);
      await directMessageEvent.fetchMembers();

      await directMessageEvent.listVoiceUsers();
      await directMessageEvent.listRoleUsers();
      
      await directMessageEvent.checkListedUsers();
      await directMessageEvent.addRemoveUsers();
      var embed = createEmbed(directMessageEvent.finalAddList, directMessageEvent.finalRemoveList);
      directMessageEvent.author.send(embed);
    }
  }
};


function createEmbed(addedToRole, removedFromRole) {
  let embed = new Discord.MessageEmbed();
  embed.setDescription('Results');
  
  embed.addField('IDs added to role: ', !addedToRole.length == 0 ? addedToRole.toString() : "None");
  embed.addField('IDs removed from role: ', !removedFromRole.length == 0 ? removedFromRole.toString() : "None");
  
  return embed;
}