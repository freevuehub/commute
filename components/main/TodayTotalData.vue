<template>
  <v-card :class="$round" elevation="10">
    <v-card-title>
      <span class="font-weight-bold">오늘</span>
      <v-btn v-if="edit" icon x-small absolute right center>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <row class="mb-3" title="출근 시간">
        <span class="body-1 font-weight-bold">{{ item.todayData.startDate || 'N/A' }}</span>
      </row>
      <row class="mb-3" title="근무 시간">
        <span class="body-1 font-weight-bold">{{ item.todayData.totalWorkTime || 'N/A' }}</span>
      </row>
      <row title="퇴근 시간">
        <span class="body-1 font-weight-bold">{{ item.todayData.endDate || 'N/A' }}</span>
      </row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="pa-0">
      <v-spacer></v-spacer>
      <h5 class="py-3">오늘은 쉬자</h5>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn small @click="onVacationClick">종일</v-btn>
      <v-btn small @click="onVacationClick">오전</v-btn>
      <v-btn small @click="onVacationClick">오후</v-btn>
      <v-btn small @click="onVacationClick">시간</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { CommuteDetailRow } from '../'

export default defineComponent({
  name: 'today',
  components: {
    row: CommuteDetailRow,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const onVacationClick = () => {
      console.log('click')
    }

    return {
      onVacationClick,
    }
  },
})
</script>
