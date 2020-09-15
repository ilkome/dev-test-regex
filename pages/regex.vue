<template lang="pug">
    section
        .input-group(
            v-for="social in socials"
        )
            input(
                type="text"
                :placeholder="$lang.socials.link.replace('<social>', $lang.socials[social.short])"
                v-model="links[social.short]"
                @change="socialValidate(social.short)"
            )
            p(
                v-if="error[social.short]"
                class="error"
            ) {{ error[social.short] }}
            a(
                v-if="socialLinks[social.short]"
                :href="socialLinks[social.short]"
            ) {{ socialLinks[social.short] }}
</template>

<script>
export default {
  data () {
    return {
      socials: [
        {
          name: 'VK',
          short: 'vk',
          aliases: [
            'vk.com', 'vkontakte.ru'
          ],
          pattern: 'https://vk.com/<login>'
        },
        {
          name: 'Instagram',
          short: 'instagram',
          aliases: [
            'instagram.com', 'www.instagram.com'
          ],
          pattern: 'https://www.instagram.com/<login>'
        },
        {
          name: 'Telegram',
          short: 'telegram',
          aliases: [
            't.me'
          ],
          protocol: [
            'tg://'
          ],
          pattern: 'https://t.me/<login>'
        }
      ],
      links: {
        vk: '',
        telegram: '',
        instagram: ''
      },
      socialLinks: {
        vk: '',
        telegram: '',
        instagram: ''
      },
      error: {
        vk: '',
        telegram: '',
        instagram: ''
      }
    }
  },
  methods: {
    /**
             * Валидация ссылок на соц. сети
             */
    socialValidate (social) {
      // Сбрасываем значения
      this.error[social] = ''
      this.socialLinks[social] = ''

      // Паттерн
      const pattern = {
        regex: /(?:(?<number>(?:!\+|)[0-9]{11}.*)|(?:(?<protocol>(?:http[s]?|tg):\/\/)|)(?:(?<domain>[a-zA-Z._-]+)\/|[a-z]+\?[a-z]+=)(?<login>(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}))/gmi,
        login: /(?<login>(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,29})/gmi
      }
      // Очищаем от пробелов внутри
      const value = this.links[social].replace(/\s/g, '')

      // Выдергиваем данные
      const regex = pattern.regex.exec(value)
      const login = pattern.login.exec(value)

      console.info(regex, login)

      // Перебираем массив с соц. сетями
      for (const i in this.socials) {
        if (this.socials[i].short === social) {
          if (regex !== null && (typeof regex.groups.domain !== 'undefined' || typeof regex.groups.protocol !== 'undefined')) {
            // Если основной паттерн нашёл вхождения
            // А также не пусты значения домена или протокола (для Telegram)
            if (this.socials[i].aliases.includes(regex.groups.domain) || (typeof this.socials[i].protocol !== 'undefined' && this.socials[i].protocol.includes(regex.groups.protocol))) {
              // Если алиас в массиве соц. сети или есть протокол
              this.socialLinks[social] = this.socials[i].pattern.replace('<login>', regex.groups.login)
            }
            else {
              this.error[social] = this.$lang.socials.error.invalid_link
            }
          }
          else if (login !== null && login.input === login.groups.login) {
            // Если паттерн для логина нашёл вхождения
            this.socialLinks[social] = this.socials[i].pattern.replace('<login>', login.groups.login)
          }
          else {
            // Если ничего не найдено, то ошибка
            this.error[social] = this.$lang.socials.error.invalid_login_link
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  display flex
  align-items center
  justify-content center
  width 100%
  min-height 100vh
  flex-direction column

  .input-group
    margin 1rem 0

    input
      min-width 50vw
      padding .75rem 1rem
      border none
      border-radius .25rem

    a
      display block
      padding 1rem 0
      color #fff
      text-decoration none

    .error
      color red
</style>
