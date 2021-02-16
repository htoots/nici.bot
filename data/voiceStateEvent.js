const {VoiceStateData} = require('./eventData');
const userFuncs = require('../functions/userFuncs');

class VoiceStateEvent extends VoiceStateData {
  constructor(oldState, newState) {
    super(oldState, newState);

    this.member = this.guild.members.cache.get(this.userID);
    this.memberRole = this.member.roles.cache.get(this.roleID);
  }
  async sameChannel() {
    this.logString = `[Mute: ${this.muted}][Deaf: ${this.deafened}][Streaming: ${this.streaming}]`;
  }
  async toggleRole() {
    if (this.oldChannelID != this.voiceChannelID) {
      if (this.memberRole === undefined) {
        this.member.roles.add(this.roleID);
        this.logString = 'Added phone zone role';
        this.newChannel.send(`User joined: ${this.userNick}`);
      }
      else this.logString = 'Add if but already role'
    } else {
      if (this.memberRole != undefined) {
        this.member.roles.remove(this.roleID);
        this.logString = 'Removed phone zone role';
      }
      else this.logString = 'Remove else but no role';
    }
  }
  async odd() {
    this.logString = 'Something probably happened in a different voiceChannel';
  }
}

module.exports = {
  VoiceStateEvent
}