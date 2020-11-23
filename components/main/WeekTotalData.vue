<template>
  <stats title="이번 주">
    <spark-line slot="before" :values="computed.weekBarValue" :labels="computed.weekBarLabels" />
    <span slot="sum">{{ item.weekTermSum }}</span>
    <span slot="avg">{{ item.weekTermAvg }}</span>
    <span slot="over">{{ item.weekOverTime }}</span>
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
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const computed = useComputed(props)

    return {
      computed,
    }
  },
})
</script>
