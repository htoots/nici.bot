const loadEvent = event => require(`../events/${event}`);

module.exports = Nici => {
    //Nici.on('debug', loadEvent('debug'));
    Nici.on('voiceStateUpdate', loadEvent('voiceStateUpdate'));
    Nici.on('message', loadEvent('message'));
    Nici.on('ready', () => loadEvent('ready')(Nici));
    Nici.on('warn', () => loadEvent('warn'));
};
