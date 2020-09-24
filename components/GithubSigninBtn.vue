<template>
  <v-btn :href="state.authUrl" block class="text-left" :class="$round" outlined>
    <v-icon class="mr-auto">mdi-github</v-icon>
    <span class="sns-btn-title text-center">Github 로그인</span>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

export default defineComponent({
  layout: 'no-header',
  transition: 'slide-y-reverse-transition',
  setup() {
    const state = reactive({
      authUrl: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}`,
    })

    return {
      state,
    }
  },
})
</script>

<style lang="scss" scoped>
.sns-btn-title {
  width: 80%;
}
</style>
