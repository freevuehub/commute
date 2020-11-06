<template>
  <v-container fluid class="container d-flex flex-column justify-center pb-16">
    <lottie :width="300" :height="300" path="lottie/user-testing.json" class="mb-5" />
    <git-btn />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { GithubSigninBtn, LottieAni } from '~/components'

export default defineComponent({
  layout: 'no-header',
  transition: 'slide-y-reverse-transition',
  components: {
    gitBtn: GithubSigninBtn,
    lottie: LottieAni,
  },
  setup(_, context) {
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
      const { $cookies, $router }: any = context.root

      if ($cookies.get('token')) {
        $router.push('/')
      }

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
