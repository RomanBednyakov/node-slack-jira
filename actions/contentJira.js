module.exports.soft = function (newTask, payload) {
  return `*Reported:* \n ${newTask.reported} \n` +
    "\n" +
    "*Отдел:*\n" +
    payload.submission['Отдел'] +
    "\n" +
    "\n" +
    "*Название:*\n" +
    payload.submission['Название'] +
    "\n" +
    "\n" +
    "*Cсылка:*\n" +
    payload.submission['Ссылка'] +
    "\n" +
    "\n" +
    "*Обоснование:*\n" +
    payload.submission['Обоснование']
};

module.exports.project = function (newTask, payload) {
  return `*Reported:* \n ${newTask.reported} \n` +
    "\n" +
    "*Имя проекта:*\n" +
    payload.submission['Имя'] +
    "\n" +
    "\n" +
    "*Тип проекта:*\n" +
    payload.submission['Тип'] +
    "\n" +
    "\n" +
    "*Руководитель:*\n" +
    payload.submission['Руководитель'] +
    "\n" +
    "\n"
};

module.exports.personal = function (newTask, payload) {
  return `*Reported:* \n ${newTask.reported} \n` +
    "\n" +
    "*Отдел:*\n" +
    payload.submission['Отдел'] +
    "\n" +
    "\n" +
    "*Имя и Фамилия:*\n" +
    payload.submission['Имя'] +
    "\n"
};
