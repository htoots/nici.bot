const logger = require('../functions/logger');

const { VoiceStateEvent } = require('../data/voiceStateEvent');

module.exports = (oldState, newState) => {

  let voiceState = new VoiceStateEvent(oldState, newState);

  if (oldState.channelID === newState.channelID)
    voiceState.sameChannel();
  else if (oldState.channelID === voiceState.voiceChannelID || newState.channelID === voiceState.voiceChannelID) {
    voiceState.toggleRole();
  }
  else {
    voiceState.odd();
  }
  logger.updateLogger(oldState, voiceState.logString);
};