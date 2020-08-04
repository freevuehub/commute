<template>
  <div class="d-flex align-center">
    <span class="body-1 font-weight-light">{{ title }}</span>
    <v-spacer></v-spacer>
    <button class="pa-0" @click.prevent="$emit('click')">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: String,
  },
})
</script>
