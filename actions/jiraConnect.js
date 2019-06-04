const JiraClient = require('jira-connector');
const jira = new JiraClient( {
  host: process.env.JIRA_HOST,
  basic_auth: {
    username: process.env.JIRA_EMAIL_USER,
    password: process.env.JIRA_TOKEN_USER
  },
});

// let project2 = {
//   "key": "EX",
//   "name": "Example",
//   "projectTypeKey": "business",
//   "projectTemplateKey": "com.atlassian.jira-core-project-templates:jira-core-project-management",
//   "description": "Example Project description",
//   "lead": "beakov.12@mail.ru",
//   "url": "http://atlassian.com",
//   "assigneeType": "PROJECT_LEAD",
//   "avatarId": 10200,
//   "issueSecurityScheme": 10001,
//   "permissionScheme": 10011,
//   "notificationScheme": 10021,
//   "categoryId": 10120
// };
// let project = {
//   // "description": "Example Project description",
//   // "name": "Example",
//   // "projectTypeKey": "software",
//   // "key": "EX",
//   // "lead": "roman",
// };
// let project3 = {
//   projectTypeKey: "software",
//   key: "RM",
//   name: "Roman-test",
//   leadAccountId: "5d9dad83140f22017db0"
// }
// jira.project.createProject(project3, (error, even) => {
//   console.log('@', even);
//   console.log('@errir', error);
// });
module.exports = jira;

