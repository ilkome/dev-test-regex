export default {
  /**
   * Nuxt rendering mode
   * See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  target: 'static',

  /**
   * Headers of the page
   * See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'dev-test-regex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ]
  },

  /**
   * Global CSS
   */
  css: [
    // { src: '~/assets/stylus/index.styl' }
  ],

  /**
   * Auto import components
   * See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /**
   * Plugins to load before mounting the App
   * https://nuxtjs.org/guide/plugins
   */
  plugins: [
  ],

  /**
   * Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    'nuxt-composition-api'
  ],

  /**
   * Color mode
   */
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark' // fallback value if not system preference found
  },

  /**
   * Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],

  /**
   * Axios module configuration
   * See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
  ** Router middleware
  */
  router: {
    middleware: []
  },

  /**
   * nuxt-i18n module configuration
   * See https://i18n.nuxtjs.org/
   */
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [{
      code: 'en',
      file: 'en-US.js'
    }, {
      code: 'ru',
      file: 'ru-RU.js'
    }],
    lazy: true,
    langDir: 'locales/'
  },

  /**
   * Manifest
   */
  pwa: {
    manifest: {
      name: 'dev-test-regex',
      short_name: 'dev-test-regex',
      background_color: '#121212',
      theme_color: '#121212'
    },

    workbox: {
      offlineStrategy: 'cacheFirst',
      runtimeCaching: []
    }
  }
}
