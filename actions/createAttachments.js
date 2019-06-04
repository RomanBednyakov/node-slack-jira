const {mediator} = require('./helpers');

module.exports.base = function(text, color) {
  return [
    {
      "text": text,
      "fallback": "Какой вопрос?",
      "callback_id": color,
      "color": color,
      "attachment_type": "default",
    }
  ];
};

module.exports.jiraTask = function(newTask, payload) {
  return {
    "fields": {
      "project": {
        "key": process.env.JIRA_PROJECT_KEY
      },
      // "assignee": {
      //   "name": "bednyakov.12@mail.ru"
      // },
      "summary": `${newTask.theme === 'Другое' ? payload.submission['Тема'] : newTask.theme} (${newTask.reported})`,
      "description": mediator(newTask.theme, newTask, payload)
      ,
      "issuetype": {
        "name": "Task"
      },
      "priority": {
        "name": "High"
      }
    }
  };
};
