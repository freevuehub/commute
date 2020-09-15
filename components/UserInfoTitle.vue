<template>
  <h1>{{ isWork ? computed.workMessage : computed.joblessMessage }}</h1>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed } from './user-info-title.fn'

export default defineComponent({
  props: {
    isWork: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = useState()
    const computed = useComputed(state)

    return {
      state,
      computed,
    }
  },
})
</script>
