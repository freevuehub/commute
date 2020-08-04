<template>
  <v-container fluid>
    <v-dialog ref="dialog" v-model="state.modal">
      <v-time-picker v-if="state.modal" v-model="state.time" full-width color="primary">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="state.modal = false">닫기</v-btn>
        <v-btn text color="primary" @click="onSaveClick">{{ state.type }}</v-btn>
      </v-time-picker>
    </v-dialog>

    <h1 class="mb-2">출퇴근 정보</h1>
    <v-card class="mb-5" dark>
      <v-card-text>
        <row class="mb-3" title="일자">
          <span class="body-1 font-weight-bold">{{ computed.commuteItem.date }}</span>
        </row>
        <row class="mb-3" title="출근시간" @click="onRowClick('출근')">
          <span class="body-1 font-weight-bold">{{ computed.commuteItem.startTime }}</span>
        </row>
        <row title="퇴근시간" @click="onRowClick('퇴근')">
          <span class="body-1 font-weight-bold">{{ computed.commuteItem.endTime }}</span>
        </row>
      </v-card-text>
    </v-card>

    <h1 class="mb-2">회사 정보</h1>
    <v-card class="mb-5" dark>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ computed.commuteItem.companyName }}</v-card-title>
      </v-img>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onBeforeMount } from '@vue/composition-api'
import { useState, useSaveClick, useRowClick, useComputed, useBeforeMounted } from './id.fn'
import { CommuteDetailRow } from '~/components'

export default defineComponent({
  components: {
    row: CommuteDetailRow,
  },
  setup(_: {}, vm: SetupContext) {
    const state = useState()
    const computed = useComputed(vm)
    const onSaveClick = useSaveClick(state, computed, vm)
    const onRowClick = useRowClick(state)

    onBeforeMount(useBeforeMounted(vm))

    return {
      state,
      computed,
      onSaveClick,
      onRowClick,
    }
  },
})
</script>
