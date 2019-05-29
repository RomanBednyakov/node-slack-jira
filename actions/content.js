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
        "text": "Конференция",
        "type": "button",
        "style": 'primary',
        "value": "Конференция"
      },
      {
        "name": "theme",
        "text": "Железо",
        "type": "button",
        "style": 'primary',
        "value": "Железо"
      },
      {
        "name": "theme",
        "text": "Cофт",
        "style": 'primary',
        "type": "button",
        "value": "Cофт",
      },
      {
        "name": "theme",
        "text": "Книги",
        "style": 'primary',
        "type": "button",
        "value": "Cофт",
      }
    ]
  }
];
const dialogNew = {
  callback_id: 'kudos_submit',
  title: 'Jira create task',
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
      label: 'Какой вопрос ?',
      type: 'select',
      name: 'вопрос',
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
          "label": "Софт",
          "value": "Софт"
        },
        {
          "label": "Книги",
          "value": "Книги"
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
      type: 'text',
      name: 'Обоснование',
      placeholder: 'Опишите причину',
    }
  ],
};
const dialog = {
  callback_id: 'kudos_submit',
  title: 'Jira create task',
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
      type: 'text',
      name: 'Обоснование',
      placeholder: 'Опишите причину',
    }
  ],
};
module.exports = {
  interactiveButtons,
  selectQuestions,
  dialogNew,
  dialog
};
