<template>
  <v-footer fixed app>
    <strong class="mr-3">FreeVue</strong>
    Copyright &copy; {{ state.year }}.
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState } from './default-footer.fn'

export default defineComponent({
  name: 'DefaultFooter',
  setup() {
    const state = useState()

    return {
      state,
    }
  },
})
</script>
