<template lang="pug">
    section
        .input-group(
            v-for="social in socials"
        )
            input(
                type="text"
                :placeholder="$lang.socials.link.replace('<social>', social.name)"
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
import { socials, blacklist, regex } from '../assets/js/socials'

export default {
  data () {
    return {
      socials,
      regex,
      blacklist,
      links: {
        vk: '',
        telegram: '',
        skype: '',
        instagram: '',
        whatsapp: '',
        viber: '',
        other1: ''
      },
      socialLinks: {
        vk: '',
        telegram: '',
        skype: '',
        instagram: '',
        whatsapp: '',
        viber: '',
        other1: ''
      },
      error: {
        vk: '',
        telegram: '',
        skype: '',
        instagram: '',
        whatsapp: '',
        viber: '',
        other1: ''
      }
    }
  },
  methods: {
    socialValidate (social) {
      // Сбрасываем значения
      this.error[social] = ''
      this.socialLinks[social] = ''

      // Очищаем от пробелов
      const value = this.links[social].replace(/\s/g, '')

      // Проходимся по массиву
      for (const i in this.socials) {
        if (this.socials[i].short === social) {
          const item = this.socials[i]
          // Если у элемента нет своего регулярного выражения, используем глобальное
          if (!item.regex) {
            item.regex = this.regex
          }
          // Если регулярное выражение что-то находит
          console.info(item.regex.exec(value))
          if (item.regex.test(value)) {
            const result = item.regex.exec(value).groups
            // Если нужна проверка по чёрному списку
            if (!!item.blacklist && !!result.domain && this.blacklist.includes(result.domain)) {
              // Домен находится в чёрном списке
              this.error[social] = this.$lang.socials.error.invalid_link_blacklist
              return false
            }
            // Проверяем результат работы регулярного выражения
            // Если есть домен и он есть у объекта
            // Или
            // Если есть протокол и он не http | https и он есть у объекта
            // Или
            // Нет домена и протокола, но есть логин
            if ((!!result.domain && item.aliases.includes(result.domain)) || (!!result.protocol && (result.protocol !== 'http' || result.protocol !== 'https') && item.protocol.includes(result.protocol)) || (!result.domain && !result.protocol && !!result.login)) {
              // Если есть регулярное выражение для логина и логин не валидный после проверки
              if (!!item.login && item.login.test(result.login) && item.login.exec(result.login)[0] !== result.login) {
                this.error[social] = this.$lang.socials.error.invalid_login
                return false
              }
              // Публикуем логин
              this.socialLinks[social] = item.pattern.replace('<login>', result.login)
            }
            else {
              // Неправильная ссылка
              this.error[social] = this.$lang.socials.error.invalid_link
            }
          }
          else {
            // Неправильная ссылка или логин
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
