const chalk = require('chalk');

module.exports = debug => {
    console.log(chalk.blue('[DEBUG]') + `${debug}`);
}