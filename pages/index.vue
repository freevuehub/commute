<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-2">일일 현황</h2>
        <today :item="state.mainData.todayData" />
      </v-col>
      <v-col cols="12" sm="6">
        <h2 class="mb-2">일주일 통계</h2>
        <stats title="이번 주">
          <span slot="sum">{{ state.mainData.weekTermSum }}</span>
          <span slot="avg">{{ state.mainData.weekTermAvg }}</span>
          <span slot="over">{{ state.mainData.weekOverTime }}</span>
        </stats>
      </v-col>
      <v-col cols="12" sm="6">
        <h2 class="mb-2">일주일 상황판</h2>
        <v-card class="py-5 px-2 mb-5">
          <v-sparkline
            :value="computed.weekBarValue"
            :auto-draw-duration="300"
            :gradient="['#71abbd']"
            auto-line-width
            type="bar"
            auto-draw
            :show-labels="true"
            :label-size="12"
            :labels="computed.weekBarLabels"
          ></v-sparkline>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <h2 class="mb-2">월 통계</h2>
        <stats title="이번 달">
          <span slot="sum">{{ state.mainData.monthTermSum }}</span>
          <span slot="avg">{{ state.mainData.monthTermAvg }}</span>
          <span slot="over">{{ state.mainData.monthOverTime }}</span>
        </stats>
      </v-col>
    </v-row>

    <floating-button
      v-if="computed.userProfile.isWork"
      :disabled-start="!!state.mainData.todayData.startDate"
      :disabled-end="!!state.mainData.todayData.endDate || !state.mainData.todayData.startDate"
      @click="onCommuteTimeSave"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed, useCommuteTimeSave } from './index.fn'
import {
  DatePickerCard,
  TimePickerCard,
  TimeSaveCard,
  FloatingButton,
  CommuteDetailRow,
  TodayTotalData,
  StatsData,
} from '~/components'

export default defineComponent({
  middleware: ['main'],
  components: {
    DatePickerCard,
    TimePickerCard,
    TimeSaveCard,
    FloatingButton,
    row: CommuteDetailRow,
    today: TodayTotalData,
    stats: StatsData,
  },
  setup(_, context) {
    const state = useState(context)
    const computed = useComputed(context, state)
    const onCommuteTimeSave = useCommuteTimeSave(context, state)

    return {
      state,
      computed,
      onCommuteTimeSave,
    }
  },
})
</script>
