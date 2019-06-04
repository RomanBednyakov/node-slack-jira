const http = require('http');
const express = require('express');
const slackEventsApi = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const bodyParser = require('body-parser');

const slackEventsModule = require('./actions/events');
const slackInteractionsModule = require('./actions/events-actions');
const slackSlashCommand = require('./actions/slachCommand');

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;
if (!slackSigningSecret || !slackAccessToken) {
  throw new Error('A Slack signing secret and access token are required to run this app.');
}
const slackEvents = slackEventsApi.createEventAdapter(slackSigningSecret, {
  includeBody: true
});
const slackInteractions = createMessageAdapter(slackSigningSecret);

const app = express();
app.use('/slack/events', slackEvents.expressMiddleware());
app.use('/slack/actions', slackInteractions.expressMiddleware());
// app.use('/oauth', event => console.log('@hubstaff Auth', event));
app.post('/slack/commands', bodyParser.urlencoded({ extended: false }), slackSlashCommand);
slackEventsModule(slackEvents);
slackInteractionsModule(slackInteractions);

const port = process.env.PORT || 0;
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
