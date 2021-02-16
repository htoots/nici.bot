const { DirectMessageData } = require('./eventData');

class DirectMessageEvent extends DirectMessageData {
  constructor(data) {
    super(data);

    this.voiceChannel = this.channels.cache.get(this.voiceChannelID);
    this.role = this.guild.roles.fetch(this.roleID);
    this.tempRemoveList = [];
    this.tempAddList = [];
    this.finalAddList = [];
    this.finalRemoveList = [];
  }

  async fetchMembers() {
    await this.guild.members.fetch();
  }

  async listVoiceUsers() {
    this.voiceUsers = await this.getUsers(this.voiceChannel);
  }

  async listRoleUsers() {
    this.roleUsers = await this.getUsers(this.role);
  }
  async getUsers(data) {
    var userList = [];
    for (const [memberID] of data.members) {
      if (memberID === this.botID) continue;
      else {
        userList.push(memberID);
      }
    }
    return userList;
  }
  async checkListedUsers() {
    this.voiceUsers.forEach(u => {
      if (!this.roleUsers.includes(u)) {
        console.log(`${u} does not have role`);
        this.tempAddList.push(u);
      }
    });
    this.roleUsers.forEach(u => {
      if (!this.voiceUsers.includes(u)) {
        console.log(`${u} is not in voice but has role`);
        this.tempRemoveList.push(u);
      }
    });
  }
  async addRemoveUsers() {
    if (!this.tempRemoveList.length == 0)
      await this.removeUsers();
    if (!this.tempAddList.length == 0)
      await this.addUsers();
  }
  async removeUsers() {
    this.tempRemoveList.forEach(u => {
      console.log(`removing ${u} from role`);
      var user = this.guild.members.cache.get(u);
      user.roles.remove(this.roleID, "User was in role but not in voice");
      this.finalRemoveList.push(u);
    });
  }
  async addUsers() {
    this.tempAddList.forEach(u => {
      console.log(`adding ${u} to role`);
      var user = this.guild.members.cache.get(u);
      user.roles.add(this.roleID, "User was in voice but not in role");
      this.finalAddList.push(u);
    });
  }
}

module.exports = {
  DirectMessageEvent
}