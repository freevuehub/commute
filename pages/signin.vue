<template>
  <v-container fluid>
    <v-card max-width="300">
      <v-card-text>
        <v-img class="rounded" src="./icon.png" width="150px"></v-img>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <auth-button />
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { AuthButton } from '~/components'

export default defineComponent({
  head() {
    return {
      script: [
        // {
        //   src: 'https://apis.google.com/js/platform.js?onload=init',
        //   async: true,
        //   defer: true,
        // },
        // { src: '/google-auth.js' },
      ],
    }
  },
  layout: 'no-auth',
  transition: 'slide-y-reverse-transition',
  components: {
    AuthButton,
  },
})
</script>
