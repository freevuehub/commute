<template>
  <v-container fluid>
    <div
      id="google-signin-button"
      ref="google-btn"
      class="pa-2 g-signin2"
      data-onsuccess="onSignIn"
    ></div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'auth',
})
</script>
