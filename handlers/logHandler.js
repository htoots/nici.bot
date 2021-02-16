const color = require('chalk');

module.exports = Nici => {
    Nici.log = new Object();

    Nici.log.date = () => console.log(`\n${new Date().toString()}`);

    Nici.log.warn = msg => console.log(color.yellow('[WARNING]: ')+ `${msg}`);
    Nici.log.error = msg => console.log(color.red('[ERROR]: ')+ `${msg}`);
    Nici.log.msg = msg => console.log(color.cyan('[Nici]: ') + `${msg}`);
    Nici.log.info = msg => console.log(color.cyan('[Nici]: ') + color.yellow(msg));
    Nici.log.console = msg => console.log(msg);
};
