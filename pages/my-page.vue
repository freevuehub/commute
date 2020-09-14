<template>
  <v-container fluid>
    <h1 class="d-flex align-center">
      {{ state.switch1 ? computed.workMessage : computed.joblessMessage }}
      <v-switch
        v-model="state.switch1"
        class="ma-0 ml-auto"
        color="primary"
        inset
        hide-details
        dense
      />
    </h1>
    <v-divider class="my-6"></v-divider>
    <h2 class="mb-2">근무 정보</h2>
    <v-card class="mb-5">
      <v-card-text>
        <row class="mb-3" title="출근 시간">
          <span class="body-1 font-weight-bold">{{ item.startDate || 'N/A' }}</span>
        </row>
        <row class="mb-3" title="퇴근 시간">
          <span class="body-1 font-weight-bold">{{ item.totalWorkTime || 'N/A' }}</span>
        </row>
        <row title="점심 시간">
          <span class="body-1 font-weight-bold">{{ item.endDate || 'N/A' }}</span>
        </row>
      </v-card-text>
    </v-card>
    <h2 class="mb-2">회사 정보</h2>
    <v-card class="mb-5" dark>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://lh3.ggpht.com/p/AF1QipMy3ma_xoft6AHOyzkoK3A4ZTU1tjtCVa7Xbp_c=s1024"
      >
        <v-card-title>{{ item.companyName }}</v-card-title>
      </v-img>
      <v-card-text>
        <row title="주소">
          <span class="address body-1 font-weight-bold">{{ item.companyAddress }}</span>
        </row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed } from './my-page.fn'
import { CommuteDetailRow } from '~/components'

export default defineComponent({
  components: {
    row: CommuteDetailRow,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const state = useState()
    const computed = useComputed(state)

    return {
      state,
      computed,
    }
  },
})
</script>
