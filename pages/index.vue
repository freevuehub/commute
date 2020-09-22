<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card color="primary" class="rounded-xl" elevation="0">
          <v-card-text>
            <span class="font-weight-light">{{ userTotalCardTitle }}</span>
            <h3 class="mt-2">{{ userTotalCardTime }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <today :item="state.mainData.todayData" />
      </v-col>
      <v-col cols="12" sm="6">
        <stats title="이번 주">
          <span slot="sum">{{ state.mainData.weekTermSum }}</span>
          <span slot="avg">{{ state.mainData.weekTermAvg }}</span>
          <span slot="over">{{ state.mainData.weekOverTime }}</span>
          <v-card slot="before" outlined class="mb-5 rounded-xl" color="primary" elevation="0">
            <v-card-text>
              <v-sparkline
                :value="computed.weekBarValue"
                :auto-draw-duration="300"
                auto-line-width
                auto-draw
                type="bar"
                :show-labels="true"
                :label-size="12"
                :labels="computed.weekBarLabels"
                :smooth="10"
              ></v-sparkline>
            </v-card-text>
          </v-card>
        </stats>
      </v-col>
      <v-col cols="12" sm="6">
        <stats title="이번 달" class="mb-3">
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

    const userTotalCardTitle = `${computed.userProfile.name}님의 이번달 근무시간입니다.`
    const userTotalCardTime = `평균: ${state.mainData.monthTermAvg} / 초과: ${state.mainData.monthOverTime}`

    return {
      state,
      computed,
      onCommuteTimeSave,
      userTotalCardTitle,
      userTotalCardTime,
    }
  },
})
</script>
