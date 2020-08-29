<template>
  <v-container fluid>
    <AuthUser />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { AuthUser } from '~/components'

export default defineComponent({
  layout: 'auth',
  components: {
    AuthUser,
  },
})
</script>
