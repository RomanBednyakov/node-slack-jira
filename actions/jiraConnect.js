const JiraClient = require('jira-connector');
const jira = new JiraClient( {
  host: process.env.JIRA_HOST,
  basic_auth: {
    username: process.env.JIRA_EMAIL_USER,
    password: process.env.JIRA_TOKEN_USER
  },
});
module.exports = jira;
