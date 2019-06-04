const interactiveButtons = {
  text: 'The terms of service for this app are _not really_ here: <https://unsplash.com/photos/bmmcfZqSjBU>',
  response_type: 'in_channel',
  attachments: [{
    text: 'Do you accept the terms of service?',
    callback_id: 'accept_tos',
    actions: [
      {
        name: 'accept_tos',
        text: 'Yes',
        value: 'accept',
        type: 'button',
        style: 'primary',
      },
      {
        name: 'accept_tos',
        text: 'No',
        value: 'deny',
        type: 'button',
        style: 'danger',
      },
    ],
  }],
};
const selectQuestions = [
  {
    "text": "Какой вопрос?",
    "fallback": "Какой вопрос?",
    "callback_id": "theme",
    "color": "#3AA3E3",
    "attachment_type": "default",
    "actions": [
      {
        "name": "theme",
        "text": "Проект",
        "type": "button",
        "style": 'primary',
        "value": "Проект"
      },
      {
        "name": "theme",
        "text": "Сотрудник",
        "type": "button",
        "style": 'primary',
        "value": "Сотрудник"
      },
      {
        "name": "theme",
        "text": "Другое",
        "type": "button",
        "style": 'primary',
        "value": "Другое"
      },
    ]
  }
];
const dialog = {
  callback_id: 'kudos_submit',
  title: 'Jira create task',
  submit_label: 'Give',
  elements: [
    {
      label: 'Какой вопрос ?',
      type: 'select',
      name: 'Тема',
      options: [
        {
          "label": "Конференция",
          "value": "Конференция"
        },
        {
          "label": "Железо",
          "value": "Железо"
        },
        {
          "label": "Cофт",
          "value": "Cофт"
        },
        {
          "label": "Книги",
          "value": "Книги"
        },
      ],
    },

    {
      label: 'Какой отдел ?',
      type: 'select',
      name: 'Отдел',
      options: [
        {
          "label": "Рекрутинг",
          "value": "Рекрутинг"
        },
        {
          "label": "Продажи",
          "value": "Продажи"
        },
        {
          "label": "Веб разработка",
          "value": "Веб разработка"
        },
        {
          "label": "Менеджмент",
          "value": "Менеджмент"
        },
        {
          "label": "Мобильная разработка",
          "value": "Мобильная разработка"
        },
        {
          "label": "Дизайн",
          "value": "Дизайн"
        },
      ],
    },

    {
      label: 'Название',
      type: 'text',
      name: 'Название',
      placeholder: 'Название чего вы хотите',
    },
    {
      label: 'Ссылка',
      type: 'text',
      name: 'Ссылка',
      placeholder: 'Напишите ссылку',
    },
    {
      label: 'Обоснование',
      type: 'textarea',
      name: 'Обоснование',
      optional: true,
      placeholder: 'Опишите причину',
    }
  ],
};
const dialogPersonal = {
  callback_id: 'kudos_submit',
  title: 'Новый сотрудник.',
  submit_label: 'Give',
  elements: [
    {
      label: 'Какой отдел ?',
      type: 'select',
      name: 'Отдел',
      options: [
        {
          "label": "Рекрутинг",
          "value": "Рекрутинг"
        },
        {
          "label": "Продажи",
          "value": "Продажи"
        },
        {
          "label": "Веб разработка",
          "value": "Веб разработка"
        },
        {
          "label": "Менеджмент",
          "value": "Менеджмент"
        },
        {
          "label": "Мобильная разработка",
          "value": "Мобильная разработка"
        },
        {
          "label": "Дизайн",
          "value": "Дизайн"
        },
      ],
    },
    {
      label: 'Имя и фамилия ?',
      type: 'text',
      name: 'Имя',
      placeholder: 'Вася Пупкин',
    },
  ],
};
const dialogProject = {
  callback_id: 'kudos_submit',
  title: 'Новый проект.',
  submit_label: 'Give',
  elements: [
    {
      label: 'Имя проекта ?',
      type: 'text',
      name: 'Имя',
      placeholder: 'Название проекта.',
    },
    {
      label: 'Тип проекта ?',
      type: 'text',
      name: 'Тип',
      placeholder: 'Напишите ссылку.',
    },
    {
      label: 'Руководитель ?',
      type: 'select',
      name: 'Руководитель',
      options: [
        {
          "label": "Igor Zorich",
          "value": "Igor Zorich"
        },
        {
          "label": "Anastasia Prokopenko",
          "value": "Anastasia Prokopenko"
        },
        {
          "label": "Anna Shiryaeva",
          "value": "Anna Shiryaeva"
        },
        {
          "label": "Alina Avdienko",
          "value": "Alina Avdienko"
        },
      ],
    },
  ],
};

module.exports = {
  interactiveButtons,
  selectQuestions,
  dialogProject,
  dialog,
  dialogPersonal
};
