<template>
  <dash-board-card :edit="edit" title="이번 주" @editing="onEditing">
    <stats>
      <spark-line slot="before" :values="week.weekList" :labels="weekBarLabels" />
      <span slot="sum">{{ week.weekTermSum }}</span>
      <span slot="avg">{{ week.weekTermAvg }}</span>
      <span slot="over">{{ week.weekOverTime }}</span>
    </stats>
  </dash-board-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { SparkLine, StatsData, DashBoardCard } from '../'
import { useCardThemeEditing } from './index.fn'
import { useComputed } from './week-total-data.fn'

export default defineComponent({
  components: {
    SparkLine,
    DashBoardCard,
    stats: StatsData,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const computed = useComputed(context)
    const onEditing = useCardThemeEditing(context)

    return {
      ...computed,
      onEditing,
    }
  },
})
</script>
