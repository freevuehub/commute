<template>
  <dash-board-card class="mb-3" :edit="edit" title="이번 달" @editing="onEditing">
    <stats>
      <span slot="sum">{{ month.monthTermSum }}</span>
      <span slot="avg">{{ month.monthTermAvg }}</span>
      <span slot="over">{{ month.monthOverTime }}</span>
    </stats>
  </dash-board-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { StatsData, DashBoardCard } from '../'
import { useCardThemeEditing } from './index.fn'
import { useComputed } from './month-total-data.fn'

export default defineComponent({
  components: {
    stats: StatsData,
    DashBoardCard,
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
