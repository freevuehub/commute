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
      <v-col v-for="(item, index) in ['오늘', '이번주', '이번달', '그냥']" :key="item" cols="6">
        <v-card :class="$round" elevation="10" color="primary">
          <v-card-title>
            <span class="font-weight-bold">{{ item }}</span>
            <v-btn icon x-small absolute right center>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-center">
            <v-progress-circular :size="100" :width="20" :value="15 * (index + 1)" color="white">
              {{ 15 * (index + 1) }}%
            </v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <stats title="이번 주">
          <spark-line
            slot="before"
            :values="computed.weekBarValue"
            :labels="computed.weekBarLabels"
          />
          <span slot="sum">{{ state.mainData.weekTermSum }}</span>
          <span slot="avg">{{ state.mainData.weekTermAvg }}</span>
          <span slot="over">{{ state.mainData.weekOverTime }}</span>
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

    <v-bottom-sheet v-model="state.bottomModalStataue">
      <sheet
        :commute-id="`${state.mainData.todayData.id}`"
        :disabled-start="!!state.mainData.todayData.startDate"
        :disabled-end="!!state.mainData.todayData.endDate || !state.mainData.todayData.startDate"
        @close="onSheetClose"
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
      @click="state.bottomModalStataue = true"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed, useSheetClose } from './index.fn'
import {
  DatePickerCard,
  TimeSaveCard,
  FloatingButton,
  CommuteDetailRow,
  TodayTotalData,
  StatsData,
  CommutePostBottomSheet,
  SparkLine,
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
    SparkLine,
  },
  setup(_, context) {
    const state = useState(context)
    const computed = useComputed(context, state)
    const onSheetClose = useSheetClose(state)

    return {
      state,
      computed,
      onSheetClose,
    }
  },
})
</script>
