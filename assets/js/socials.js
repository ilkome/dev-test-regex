export const socials = [
  {
    name: 'VK',
    short: 'vk',
    aliases: [
      'vk.com', 'vkontakte.ru'
    ],
    protocol: [
      'vk'
    ],
    pattern: 'https://vk.com/<login>'
  },
  {
    name: 'Instagram',
    short: 'instagram',
    aliases: [
      'instagram.com', 'www.instagram.com'
    ],
    protocol: [
      'instagram'
    ],
    // login: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/m,
    pattern: 'https://www.instagram.com/<login>/'
  },
  {
    name: 'Telegram',
    short: 'telegram',
    aliases: [
      't.me', 'www.t.me'
    ],
    protocol: [
      'tg'
    ],
    login: /[a-zA-Z0-9_]{5,32}/,
    pattern: 'https://t.me/<login>'
  },
  {
    name: 'Skype',
    short: 'skype',
    aliases: [
    ],
    protocol: [
      'skype'
    ],
    pattern: '<login>'
  },
  {
    name: 'Viber',
    short: 'viber',
    aliases: [
    ],
    protocol: [
      'viber'
    ],
    login: /[0-9]{8,}/,
    pattern: '<login>'
  },
  {
    name: 'What\'s App',
    short: 'whatsapp',
    aliases: [
      'wa.me'
    ],
    protocol: [
      'whatsapp'
    ],
    login: /[0-9]{8,}/,
    pattern: 'https://wa.me/<login>'
  },
  {
    name: 'Other',
    short: 'other1',
    blacklist: true
  }
]

export const blacklist = [
  'www.youtube.com', 'youtube.com', 'm.youtube.com', 'yandex.ru'
]

export const regex = /(?:(?:(?<protocol>(?:http[s]?|[a-z]{2,})|)(?:\:\/\/|\:|)|)(?:(?<domain>[a-zA-Z._-]+)\/|[a-z]+\?[a-z]+=|)(?<login>(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}))/
