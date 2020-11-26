<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <month-report :name="computed.userProfile.name" />
      </v-col>
      <v-col v-for="item in ['today', 'week', 'month']" :key="item" cols="12">
        <component :is="item" />
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
  CommutePostBottomSheet,
  MonthReport,
} from '~/components'

export default defineComponent({
  middleware: ['main'],
  components: {
    DatePickerCard,
    TimeSaveCard,
    FloatingButton,
    MonthReport,
    row: CommuteDetailRow,
    sheet: CommutePostBottomSheet,
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
