<template>
  <v-container fluid>
    <h1 class="mb-2">통계</h1>
    <v-card class="mb-5">
      <v-card-text>
        <row class="mb-3" title="일주일 총 근무시간">
          <span class="body-1 font-weight-bold">{{ state.mainData.termSum }}</span>
        </row>
        <row title="일주일 평균 근무시간">
          <span class="body-1 font-weight-bold">{{ state.mainData.termAvg }}</span>
        </row>
      </v-card-text>
    </v-card>

    <h1 class="mb-2">일주일 상황판</h1>
    <v-card class="pa-2">
      <v-sparkline
        :value="computed.weekBarValue"
        :auto-draw-duration="300"
        :gradient="['#71b9c1']"
        :padding="10"
        auto-line-width
        type="bar"
        auto-draw
        :show-labels="true"
        :label-size="12"
        :labels="computed.weekBarLabels"
      ></v-sparkline>
    </v-card>
    <floating-button />
  </v-container>
</template>

<script lang="ts">
import { SetupContext, defineComponent, onBeforeMount } from '@vue/composition-api'
import { useState, useComputed, useStartTimeSave, useEndTimeSave, useBeforeMount } from './index.fn'
import {
  DatePickerCard,
  TimePickerCard,
  TimeSaveCard,
  FloatingButton,
  CommuteDetailRow,
} from '~/components'

export default defineComponent({
  components: {
    DatePickerCard,
    TimePickerCard,
    TimeSaveCard,
    FloatingButton,
    row: CommuteDetailRow,
  },
  setup(_: {}, vm: SetupContext) {
    const state = useState(vm)
    const computed = useComputed(state)
    const onStartTimeSave = useStartTimeSave(vm, state)
    const onEndTimeSave = useEndTimeSave(vm, state)

    onBeforeMount(useBeforeMount(vm.root))

    return {
      state,
      computed,
      onStartTimeSave,
      onEndTimeSave,
    }
  },
})
</script>
