<template>
  <stats title="이번 달" class="mb-3">
    <span slot="sum">{{ month.monthTermSum }}</span>
    <span slot="avg">{{ month.monthTermAvg }}</span>
    <span slot="over">{{ month.monthOverTime }}</span>
  </stats>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { StatsData } from '../'
import { useComputed } from './month-total-data.fn'

export default defineComponent({
  components: {
    stats: StatsData,
  },
  setup(_, context) {
    const computed = useComputed(context)

    return {
      ...computed,
    }
  },
})
</script>
