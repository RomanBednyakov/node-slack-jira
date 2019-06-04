const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;
const { WebClient } = require('@slack/client');
const web = new WebClient(slackAccessToken);
const axios = require('axios');
const { interactiveButtons, dialog } = require('./content');

module.exports = function(req, res, next) {
  if (req.body.command === '/interactive-example') {
    const type = req.body.text.split(' ')[0];
    if (type === 'button') {
      res.json(interactiveButtons);
    } else if (type === 'dialog') {
      res.send();
      web.dialog.open({
        trigger_id: req.body.trigger_id,
        dialog,
      }).catch((error) => {
        return axios.post(req.body.response_url, {
          text: `An error occurred while opening the dialog: ${error.message}`,
        });
      }).catch(console.error);
    } else {
      res.send('Use this command followed by `button`, `menu`, or `dialog`.');
    }
  } else {
    next();
  }
};
