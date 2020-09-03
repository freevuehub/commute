<template>
  <v-container fluid>
    <v-card max-width="300">
      <v-card-text>
        <v-img class="rounded" src="./icon.png" width="150px"></v-img>
      </v-card-text>
      <div id="google-signin-button" ref="google-signin-button" class="google-button"></div>
      <v-btn :href="state.authUrl" block class="text-left">
        <v-icon>mdi-github</v-icon>
        <span>Github 로그인</span>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
// import { AuthButton } from '~/components'

export default defineComponent({
  layout: 'no-header',
  transition: 'slide-y-reverse-transition',
  setup() {
    const state = reactive({
      authUrl: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`,
    })
    const onFailure = (error: any) => {
      console.log(error)
    }
    const onSuccess = (googleUser: any) => {
      const authData = googleUser.getAuthResponse()
      const profile = googleUser.getBasicProfile()

      // document.cookie = `token=${authData.id_token};`

      console.log({
        authData: {
          idToken: authData.id_token,
          idpId: authData.idpId,
          loginHint: authData.login_hint,
          tokenType: authData.token_type,
        },
        profile: {
          id: profile.getId(),
          name: profile.getName(),
          imageUrl: profile.getImageUrl(),
          email: profile.getEmail(),
        },
      })
    }

    onMounted(() => {
      window.onload = () => {
        // @ts-ignore
        const { $gapi } = window

        $gapi.signin2.render('google-signin-button', {
          scope: 'profile email',
          width: 240,
          height: 36,
          longtitle: true,
          onsuccess: onSuccess,
          onfailure: onFailure,
        })
      }
    })

    return {
      state,
    }
  },
})
</script>

<style lang="scss" scoped>
.google-button {
  width: 100%;
}
</style>
