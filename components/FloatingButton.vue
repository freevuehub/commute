<template>
  <v-speed-dial
    v-model="state.active"
    fixed
    bottom
    right
    direction="left"
    transition="slide-x-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="state.active" color="primary" dark fab>
        <v-icon v-if="state.active">mdi-close</v-icon>
        <v-icon v-else>more_horiz</v-icon>
      </v-btn>
    </template>
    <v-btn rounded dark color="indigo">퇴근</v-btn>
    <v-btn rounded dark color="green">출근</v-btn>
  </v-speed-dial>
</template>

<script lneg="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      active: false,
    })

    return {
      state,
    }
  },
})
</script>
