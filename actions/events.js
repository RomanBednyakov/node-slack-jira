const { selectQuestions } = require('./content');
const slackEventsApi = require('@slack/events-api');
const getClientByTeamId = require('./helpers').slackOauth;
const jira = require('../actions/jiraConnect');
const attachmentsBase = require('./createAttachments');
module.exports = function(slackEvents) {

  slackEvents.on('message', (message, body) => {
    if (!message.subtype && message.text.indexOf('<@UJP43GX17>') >= 0) {
      const slack = getClientByTeamId(body.team_id);
      if (!slack) {
        return console.error('No authorization found for this team. Did you install the app through the url provided by ngrok?');
      }
      if(message.text.indexOf('status') >= 0) {
        const issueKey = message.text.slice(message.text.lastIndexOf('status') + 6).replace(/\s/g, '');
        if (issueKey.length > 2) {
          jira.issue.getIssue({
            issueKey: issueKey
          }, function(error, issue) {
            if(issue) {
              slack.chat.postMessage({ channel: message.channel,
                attachments: attachmentsBase.base(
                  `Status you issue ${'`'}${issue.fields.status.name}${'`'}`,
                  '#24e336'
                )
                })
                .catch(console.error);
            } else {
              slack.chat.postMessage({ channel: message.channel,
                attachments: attachmentsBase.base(error.errorMessages[0], '#ff000c')
              })
                .catch(console.error);
            }
          });
        } else {
          slack.chat.postMessage({ channel: message.channel,
            attachments: attachmentsBase.base('Please write key jira issue!', '#ff000c')
          })
            .catch(console.error);
        }
      } else  {
        slack.chat.postMessage({ channel: message.channel,
          attachments: selectQuestions})
          .catch(console.error);
      }
    }
  });

  slackEvents.on('error', (error) => {
    if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
      console.error(`An unverified request was sent to the Slack events Request URL. Request body: \
  ${JSON.stringify(error.body)}`);
    } else {
      console.error(`An error occurred while handling a Slack event: ${error.message}`);
    }
  });

};
