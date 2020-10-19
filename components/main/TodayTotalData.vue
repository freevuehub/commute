<template>
  <v-card :class="$round" elevation="10">
    <v-card-title>
      <span class="font-weight-bold">오늘</span>
    </v-card-title>
    <v-card-text>
      <row class="mb-3" title="출근 시간">
        <span class="body-1 font-weight-bold">{{ item.startDate || 'N/A' }}</span>
      </row>
      <row class="mb-3" title="근무 시간">
        <span class="body-1 font-weight-bold">{{ item.totalWorkTime || 'N/A' }}</span>
      </row>
      <row title="퇴근 시간">
        <span class="body-1 font-weight-bold">{{ item.endDate || 'N/A' }}</span>
      </row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="py-0">
      <v-spacer></v-spacer>
      <h5 class="py-3">휴가 쓰자</h5>
      <v-spacer></v-spacer>
      <v-divider vertical class="mr-5"></v-divider>
      <v-btn small>하루</v-btn>
      <v-btn small>오전</v-btn>
      <v-btn small>오후</v-btn>
      <v-btn small>시차</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { CommuteDetailRow } from '../'

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
})
</script>
