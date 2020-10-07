<template>
  <v-card tile elevation="10">
    <v-card-text class="pb-0">
      <v-row class="align-center">
        <v-col cols="8">
          <h3 class="ma-0 text-left">현재 시간은</h3>
          <h2 class="ma-0 text-center primary--text">{{ nowTime }}</h2>
          <h3 class="ma-0 text-right">입니다.</h3>
        </v-col>
        <v-col cols="4">
          <v-btn
            block
            color="indigo"
            class="mb-5"
            :disabled="disabledStart"
            @click="onCommuteBtnClick('출근')"
          >
            출근
          </v-btn>
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
