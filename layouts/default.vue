<script>
export default {
  name: 'DefaultLayout'
}
</script>

<template lang="pug">
.layout
  Header
  Nuxt
</template>

<style lang="stylus">
*
  box-sizing border-box
  -webkit-tap-highlight-color transparent

  &:focus
    outline 0

html
  font-size 16px
  overscroll-behavior-y contain

body
  margin 0
  font-family "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif
  font-size 18px
  line-height 1
  letter-spacing 0
  overscroll-behavior-y contain
</style>

<style lang="stylus" scoped>
.layout
  display flex
  flex-flow column
  max-width 666px
  min-width 320px
  margin 0 auto
  padding 16px
</style>
