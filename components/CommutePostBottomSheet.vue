<template>
  <v-card elevation="10" class="round">
    <v-card-text class="pb-0">
      <v-row class="justify-space-around">
        <v-col cols="12">
          <h3 class="font-weight-bold">
            현재 시간은
            <span class="primary--text headline mx-1 font-weight-black">{{ nowTime }}</span>
            입니다.
          </h3>
        </v-col>
        <v-col cols="5" class="pt-0">
          <v-btn block color="indigo" :disabled="disabledStart" @click="onCommuteBtnClick('출근')">
            출근
          </v-btn>
        </v-col>
        <v-col cols="5" class="pt-0">
          <v-btn block color="green" :disabled="disabledEnd" @click="onCommuteBtnClick('퇴근')">
            퇴근
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import {
  useState,
  useCommuteBtnClick,
  useBeforeMount,
  useComputed,
} from './commute-post-bottom-sheet.fn'

export default defineComponent({
  props: {
    disabledStart: Boolean,
    disabledEnd: Boolean,
    commuteId: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const state = useState()
    const computed = useComputed(state)
    const onCommuteBtnClick = useCommuteBtnClick(context, props.commuteId, state)

    onBeforeMount(useBeforeMount(state))

    return {
      state,
      ...computed,
      onCommuteBtnClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.round {
  border-radius: 20px 20px 0 0 !important;
}
</style>
