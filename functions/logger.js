const chalk = require('chalk');

function updateLogger(member, log) {
  member.client.log.date();
  member.client.log.console(`${chalk.green('[SERVER]:')} ${member.guild} ${chalk.cyan(`<#${member.guild.id}>`)}`);
  member.client.log.console(`${chalk.green('[USER]:')} ${chalk.magenta(member.guild.members.cache.get(member.id).displayName)}`);
  member.client.log.console(`${chalk.green('[LOG]:')} ${log}`);
}

function messageLogger(message, log='message') {
  message.client.log.date();
  message.client.log.console(`${chalk.green('[USER]:')} ${chalk.magenta(message.author.tag)} ${chalk.cyan(message.author)}`);
  message.client.log.console(`${chalk.green('[LOG]:')} ${log}`);
}

module.exports = { updateLogger, messageLogger }