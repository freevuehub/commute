<template>
  <v-container fluid>
    <date-picker-card v-model="state.date" class="mb-5" />
    <time-picker-card v-model="state.time" class="mb-5" />
    <time-save-card
      class="mb-5"
      type="start"
      :date-time="computed.mainData.startDate || 'N/A'"
      :loading="state.startLoading"
      @click="onStartTimeSave"
    />
    <time-save-card
      type="end"
      :date-time="computed.mainData.endDate || 'N/A'"
      :loading="state.endLoading"
      @click="onEndTimeSave"
    />
  </v-container>
</template>

<script lang="ts">
import { SetupContext, defineComponent, onBeforeMount } from '@vue/composition-api'
import { useState, useComputed, useStartTimeSave, useEndTimeSave, useBeforeMount } from './index.fn'
import { DatePickerCard, TimePickerCard, TimeSaveCard } from '~/components'

export default defineComponent({
  components: { DatePickerCard, TimePickerCard, TimeSaveCard },
  setup(_: {}, { root }: SetupContext) {
    const state = useState()
    const computed = useComputed(root)
    const onStartTimeSave = useStartTimeSave(root, state)
    const onEndTimeSave = useEndTimeSave(root, state)

    onBeforeMount(useBeforeMount(root))

    return {
      state,
      computed,
      onStartTimeSave,
      onEndTimeSave,
    }
  },
})
</script>
