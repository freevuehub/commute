<template>
  <stats title="이번 달" class="mb-3">
    <span slot="sum">{{ item.monthTermSum }}</span>
    <span slot="avg">{{ item.monthTermAvg }}</span>
    <span slot="over">{{ item.monthOverTime }}</span>
  </stats>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { StatsData } from '../'

export default defineComponent({
  components: {
    stats: StatsData,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
