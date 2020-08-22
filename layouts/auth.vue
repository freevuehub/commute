<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
    <default-footer />
    <snack-bar />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { SnackBar } from '~/containers'
import { DefaultFooter } from '~/components'

export default defineComponent({
  components: {
    DefaultFooter,
    SnackBar,
  },
})
</script>
