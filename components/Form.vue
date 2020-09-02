<script>
export default {
  name: 'Form',
  data () {
    return {
      input: '',
      error: 'Переменная для ошибки',
      finalLink: 'https://instagram.com/ilkome'
    }
  }
}
</script>

<template lang="pug">
form.form
  textarea(v-model="input")
  button(type="submit") Сохраниь

  h3 Ошибка
  pre {{ error }}

  h3 Ссылка
  pre {{ finalLink }}
</template>

<style lang="stylus" scoped>
.form
  padding 16px
  background #cecece
  border-radius 16px
</style>
