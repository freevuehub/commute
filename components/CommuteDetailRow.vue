<template>
  <div class="d-flex">
    <span class="body-1 font-weight-light">{{ title }}</span>
    <v-spacer></v-spacer>
    <span class="body-1 font-weight-bold">
      <slot></slot>
    </span>
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
