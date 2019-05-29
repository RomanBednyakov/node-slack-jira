const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;
const { WebClient } = require('@slack/client');
const web = new WebClient(slackAccessToken);
const { dialog, dialogNew } = require('./content');
const axios = require('axios');
const getClientByTeamId = require('./helpers');

const jira = require('./jiraConnect');
let newTask = {
  reported: '',
  theme: '',
  department: '',
  title: '',
  url: '',
  reason: ''
};

module.exports = function(slackInteractions) {

  slackInteractions.action('theme', (payload, respond) => {
    const slack = getClientByTeamId(payload.team.id);
    slack.users.info({user: payload.user.id, include_locale: true})
      .then(event => newTask.reported =  event.user.profile.real_name)
      .catch(() => newTask.reported = payload.user.name);
    newTask.theme = payload.actions[0].value;
    web.dialog.open({
      trigger_id: payload.trigger_id,
      dialog,
    }).catch((error) => {
      return axios.post(payload.response_url, {
        text: `An error occurred while opening the dialog: ${error.message}`,
      });
    }).catch(console.error);
    slack.chat.delete({channel: payload.channel.id,
      ts: payload.message_ts, as_user: true});
  });

  slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
    newTask.title = payload.submission['Название'];
    newTask.department = payload.submission['Отдел'];
    newTask.url = payload.submission['Ссылка'];
    newTask.reason = payload.submission['Обоснование'];
    const bodyData = {
      "fields": {
        "project": {
          "key": "ISB"
        },
        // "assignee": {
        //   "name": "bednyakov.12@mail.ru"
        // },
        "summary": `${newTask.theme} (${newTask.reported})`,
        "description":
          `*Reported:* \n ${newTask.reported} \n` +
          "\n" +
          "*Отдел:*\n" +
          newTask.department +
          "\n" +
          "\n" +
          "*Название:*\n" +
          newTask.title +
          "\n" +
          "\n" +
          "*Cсылка:*\n" +
          newTask.url +
          "\n" +
          "\n" +
          "*Обоснование:*\n" +
          newTask.reason
        ,
        "issuetype": {
          "name": "Task"
        },
        "priority": {
          "name": "High"
        }
      }
    };
    jira.issue.createIssue(bodyData, function(error, issue) {
      if (issue) {
        respond({
          text: `
          Тема: ${'`'}${newTask.theme}${'`'}\n Название: ${'`'}${newTask.title}${'`'}\n Jira key issue: ${'`'}${issue.key}${'`'}
          `,
        });
      } else {
        respond({
          text: 'jira not create task! ',
        });
      }
      // console.log(2,error);
    });
    // setTimeout(() => {
    //   respond({
    //     text: 'jira create task!',
    //   });
    // });
    // const errors = validateKudosSubmission(payload.submission);
    // if (errors) {
    //   return errors;
    // } else {
    //   setTimeout(() => {
    //     console.log('@dialog_submission', payload);
    //     respond({
    //       text: 'nice',
    //     });
    //   });
    // }
  });
};
function validateKudosSubmission(submission) {
  let errors = [];
  if (!submission.comment.trim()) {
    errors.push({
      name: 'comment',
      error: 'The comment cannot be empty',
    });
  }
  if (errors.length > 0) {
    return { errors };
  }
}
