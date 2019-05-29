const { WebClient } = require('@slack/client');
const LocalStorage = require('node-localstorage').LocalStorage;
const botAuthorizationStorage = new LocalStorage('./storage');
const clients = {};

module.exports = function(teamId) {
  botAuthorizationStorage.setItem(teamId, process.env.SLACK_BOT_TOKEN);
  if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
    clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
  }
  if (clients[teamId]) {
    return clients[teamId];
  }
  return null;
};
