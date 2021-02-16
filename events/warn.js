const chalk = require('chalk');

module.exports = info => {
  console.log(chalk.yellow('[WARNING]'));
  console.log(info);
  console.log(chalk.yellow('[/WARNING]'));
};
