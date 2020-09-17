<template>
  <thead>
    <tr>
      <th v-for="header in headers" :key="header">{{ header }}</th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    headers: Array,
  },
})
</script>
