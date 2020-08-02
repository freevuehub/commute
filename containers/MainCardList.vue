<template>
  <v-container fluid>
    <date-picker-card v-model="state.date" class="mb-5" />
    <time-picker-card v-model="state.time" class="mb-5" />
    <time-save-card
      class="mb-5"
      type="start"
      :date-time="computed.mainData.startDate || 'N/A'"
      @click="onStartTimeSave"
    />
    <time-save-card
      class="mb-5"
      type="end"
      :date-time="computed.mainData.endDate || 'N/A'"
      @click="onEndTimeSave"
    />
  </v-container>
</template>

<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useState, useComputed, useStartTimeSave, useEndTimeSave } from './main-card-list.fn'
import { DatePickerCard, TimePickerCard, TimeSaveCard } from '~/components'

export default defineComponent({
  components: {
    DatePickerCard,
    TimePickerCard,
    TimeSaveCard,
  },
  setup(_: {}, { root }: SetupContext) {
    const state = useState()
    const computed = useComputed(root)
    const onStartTimeSave = useStartTimeSave(root, state)
    const onEndTimeSave = useEndTimeSave(root, state)

    return {
      state,
      computed,
      onStartTimeSave,
      onEndTimeSave,
    }
  },
})
</script>
