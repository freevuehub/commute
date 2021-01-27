import colors from 'vuetify/es5/util/colors'
import { ko } from 'vuetify/src/locale'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + 'FreeVue',
    title: '출!사표',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { name: 'theme-color', content: '#6bb3b8' },
      {
        name: 'google-signin-client_id',
        content: `${process.env.GOOGLE_SIGNIN_CLIENT_ID}.apps.googleusercontent.com`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://apis.google.com/js/platform.js?onload=init',
        async: true,
        defer: true,
      },
      { src: '/google-auth.js' },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['material-design-icons-iconfont/dist/material-design-icons.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', { id: process.env.GOOGLE_ANALYTICE_ID }],
  ],
  manifest: {
    name: '출!사표',
    short_name: '출!사표',
    start_url: '/?utm_source=homescreen',
    display: 'standalone',
    background_color: '#6bb3b8',
    theme_color: '#6bb3b8',
    orientation: 'portrait',
    scope: '/',
    splash_pages: null,
  },
  workbox: {
    offline: false,
    runtimeCaching: [
      {
        urlPattern: '/*',
        handler: 'networkFirst',
        method: 'GET',
      },
    ],
    importScripts: ['sw.js'],
  },
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/dayjs',
    '~/plugins/axios',
    '~/plugins/themeClass',
    '~/plugins/main-component',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#6bb3b8',
          // primary: '#939599',
          // primary: '#f7e10e',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#6bb3b8',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
      lang: {
        locales: { ko },
        current: 'ko',
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  env: {
    API_PROTOCOL: process.env.API_PROTOCOL,
    API_URL: process.env.API_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    GOOGLE_SIGNIN_CLIENT_ID: process.env.GOOGLE_SIGNIN_CLIENT_ID,
  },
}
