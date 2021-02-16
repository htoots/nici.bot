
const COLOR = require('chalk');

module.exports = Nici => {
  Nici.user.setActivity('a competition', {type: "COMPETING"})

  Nici.log.console('\n');
  Nici.log.console(COLOR.green('[Bot ID] ') + Nici.credentials.botId);
  Nici.log.console(COLOR.green('[Owner IDs] ') + Nici.credentials.ownerId.join(', '));
  Nici.log.console(`${COLOR.cyan(`[${Nici.user.username}]:`)} I am up`);
};
