<template>
  <stats title="이번 주">
    <spark-line slot="before" :values="week.weekList" :labels="weekBarLabels" />
    <span slot="sum">{{ week.weekTermSum }}</span>
    <span slot="avg">{{ week.weekTermAvg }}</span>
    <span slot="over">{{ week.weekOverTime }}</span>
  </stats>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { SparkLine, StatsData } from '../'
import { useComputed } from './week-total-data.fn'

export default defineComponent({
  components: {
    SparkLine,
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
