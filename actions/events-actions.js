const { WebClient } = require('@slack/client');
const jira = require('./jiraConnect');
const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;
const web = new WebClient(slackAccessToken);
const axios = require('axios');
const {slackOauth, mediator} = require('./helpers');
const attachmentsBase = require('./createAttachments');

let newTask = {
  reported: '',
  theme: '',
};

module.exports = function(slackInteractions) {

  slackInteractions.action('theme', (payload, respond) => {
    const slack = slackOauth(payload.team.id);

    slack.users.info({user: payload.user.id, include_locale: true})
      .then(event => newTask.reported =  event.user.profile.real_name)
      .catch(() => newTask.reported = payload.user.name);

    newTask.theme = payload.actions[0].value;

    web.dialog.open({
      trigger_id: payload.trigger_id,
      dialog: mediator(newTask.theme),
    }).catch((error) => {
      return axios.post(payload.response_url, {
        text: `An error occurred while opening the dialog: ${error.message}`,
      });
    }).catch(console.error);

    slack.chat.delete({channel: payload.channel.id,
      ts: payload.message_ts, as_user: true});

  });

  slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
    jira.issue.createIssue(attachmentsBase.jiraTask(newTask,payload), function(error, issue) {
      if (issue) {
        respond({
          attachments: attachmentsBase.base(
            `Jira key issue: ${'`'}${issue.key}${'`'} Тема: ${'`'}${newTask.theme}${'`'}`,
            '#24e336'
          )
        });
      } else {
        respond({
          attachments: attachmentsBase.base(
          `jira not create task!`,
          '#e3002d'
        ),
        });
      }
    });
  });
};
