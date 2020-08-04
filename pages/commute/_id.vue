<template>
  <v-container fluid>
    <h1 class="mb-2">출퇴근 정보</h1>
    <v-card class="mb-5" dark>
      <v-card-text>
        <row class="mb-3" title="일자">{{ computed.commuteItem.date }}</row>
        <row class="mb-3" title="출근시간">{{ computed.commuteItem.startTime }}</row>
        <row title="퇴근시간">{{ computed.commuteItem.endTime }}</row>
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
import { useState, useComputed, useBeforeMounted } from './id.fn'
import { CommuteDetailRow } from '~/components'

export default defineComponent({
  components: {
    row: CommuteDetailRow,
  },
  setup(_: {}, vm: SetupContext) {
    const state = useState()
    const computed = useComputed(vm)

    onBeforeMount(useBeforeMounted(vm))

    return {
      state,
      computed,
    }
  },
})
</script>
