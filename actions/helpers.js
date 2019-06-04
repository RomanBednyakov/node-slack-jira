const { WebClient } = require('@slack/client');
const LocalStorage = require('node-localstorage').LocalStorage;
const botAuthorizationStorage = new LocalStorage('./storage');
const clients = {};
const { dialog, dialogPersonal, dialogProject } = require('./content');
const {soft, personal, project} = require('./contentJira');

module.exports.slackOauth = function(teamId) {
  botAuthorizationStorage.setItem(teamId, process.env.SLACK_BOT_TOKEN);
  if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
    clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
  }
  if (clients[teamId]) {
    return clients[teamId];
  }
  return null;
};
module.exports.mediator = function(type, newTask, payload ) {
  switch (type) {
    case 'Другое':
      return newTask ? soft(newTask, payload) : dialog;
    // case 'Железо':
    //   return  newTask ? soft(newTask, payload) : dialog;
    // case 'Cофт':
    //   return  newTask ? soft(newTask, payload) : dialog;
    // case 'Книги':
    //   return  newTask ? soft(newTask, payload) : dialog;
    case 'Сотрудник':
      return  newTask ? personal(newTask, payload) : dialogPersonal;
    case 'Проект':
      return  newTask ? project(newTask, payload) : dialogProject;
  }
};
