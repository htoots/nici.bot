class BaseEventData {
  constructor(data) {
    this.client = data.client;
    this.botID = this.client.credentials.botId;
    
    this.guildData = this.client.config.goldenData;
    this.roleID = this.guildData.roleID;
    this.voiceChannelID = this.guildData.voiceChannelID;
    this.guildID = this.guildData.guildID;
    this.guild = this.client.guilds.cache.get(this.guildID);
    this.textChannelID = this.guildData.textChannelID;
  }
}

class MessageData extends BaseEventData {
  constructor(data) {
    super(data);
    this.userID = data.author.id;

    this.guildID = this.guildData.guildID;
    this.groupID = this.guildData.channelGroupID;


    this.channels = this.guild.channels;

    this.authorID = data.author.id;
  }

}

class DirectMessageData extends MessageData {
  constructor(data) {
    super(data);
    this.author = data.author;
  }
}

class VoiceStateData extends BaseEventData {
  constructor(oldData, newData) {
    super(oldData);

    this.userID = oldData.id;
    this.userNick = newData.member.displayName;

    this.oldChannelID = oldData.channelID;
    this.newChannelID = newData.channelID;

    this.newChannel = newData.guild.channels.cache.get(this.textChannelID);

    this.deafened = newData.selfDeaf ? "Y" : "N";
    this.muted = newData.selfMute ? "Y" : "N";
    this.streaming = newData.streaming ? "Y" : "N";
    
    this.logString = '';
  }
}

module.exports = {
  MessageData, 
  VoiceStateData,
  DirectMessageData
}