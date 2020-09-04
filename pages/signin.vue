<template>
  <v-container fluid class="d-flex container">
    <v-card class="ma-auto" outlined>
      <v-img class="rounded" src="./icon.png" width="250px"></v-img>
      <!-- <div id="google-signin-button" ref="google-signin-button" class="google-button"></div> -->
      <v-card-actions>
        <git-btn />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { GithubSigninBtn } from '~/components'

export default defineComponent({
  layout: 'no-header',
  transition: 'slide-y-reverse-transition',
  components: {
    gitBtn: GithubSigninBtn,
  },
  setup() {
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

    return {}
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .google-button {
    width: 100%;
  }
}
</style>
