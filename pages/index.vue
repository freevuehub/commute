<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card color="primary" :class="$round" elevation="0" dark>
          <v-card-text>
            <span class="font-weight-light text--primary">
              {{ computed.userProfile.name }}님의 이번달 근무시간입니다.
            </span>
            <h3 class="mt-2 font-weight-black text--primary">
              평균: {{ state.mainData.monthTermAvg }} / 초과: {{ state.mainData.monthOverTime }}
            </h3>
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
          <v-card
            slot="before"
            outlined
            :class="`${$round} mb-5`"
            color="primary"
            elevation="0"
            dark
          >
            <v-card-text>
              <v-sparkline
                class="text--primary"
                :value="computed.weekBarValue"
                :auto-draw-duration="300"
                auto-line-width
                auto-draw
                type="bar"
                :show-labels="true"
                :label-size="14"
                :labels="computed.weekBarLabels"
                :smooth="5"
              >
                <template v-slot:label="item">{{ item.value }}</template>
              </v-sparkline>
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

    <v-bottom-sheet v-model="state.test">
      <sheet
        :disabled-start="!!state.mainData.todayData.startDate"
        :disabled-end="!!state.mainData.todayData.endDate || !state.mainData.todayData.startDate"
        @click="onCommuteTimeSave"
      />
    </v-bottom-sheet>

    <v-btn
      v-if="computed.userProfile.isWork"
      color="primary"
      elevation="10"
      dark
      fixed
      bottom
      right
      fab
      @click="state.test = true"
    >
      <v-icon>more_horiz</v-icon>
    </v-btn>

    <!-- <floating-button
      v-if="computed.userProfile.isWork"
      :disabled-start="!!state.mainData.todayData.startDate"
      :disabled-end="!!state.mainData.todayData.endDate || !state.mainData.todayData.startDate"
      @click="onCommuteTimeSave"
    /> -->
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
  CommutePostBottomSheet,
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
    sheet: CommutePostBottomSheet,
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
