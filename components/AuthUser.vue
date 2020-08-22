<template>
  <div>
    <div
      id="google-signin-button"
      ref="google-signin-button"
      class="pa-2 g-signin2"
      data-onsuccess="onSignIn"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { AuthConstant } from '~/constant'

export default defineComponent({
  setup(_, context) {
    onMounted(() => {
      const { refs }: any = context
      const onGoogleSignin = (event: CustomEvent) => {
        context.root.$store.dispatch(`auth/${AuthConstant.$Call.Auth}`, event.detail)
      }

      refs['google-signin-button'].addEventListener('GOOGLE_AUTH', onGoogleSignin)
    })
  },
})
</script>
