<template>
  <dash-board-card :edit="edit" title="오늘" :index="index" @editing="onEditing">
    <v-card-text>
      <row class="mb-3" title="출근 시간">
        <span class="body-1 font-weight-bold">{{ today.startDate }}</span>
      </row>
      <row class="mb-3" title="근무 시간">
        <span class="body-1 font-weight-bold">{{ today.totalWorkTime }}</span>
      </row>
      <row title="퇴근 시간">
        <span class="body-1 font-weight-bold">{{ today.endDate }}</span>
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
  </dash-board-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CommuteDetailRow } from '../'
import { useCardThemeEditing } from './index.fn'
import { useComputed } from './today-total-data.fn'
import DashBoardCard from './DashBoardCard.vue'

export default defineComponent({
  name: 'today',
  components: {
    row: CommuteDetailRow,
    DashBoardCard,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(_, context) {
    const computed = useComputed(context)
    const onVacationClick = () => {
      console.log('click')
    }
    const onEditing = useCardThemeEditing(context)

    return {
      ...computed,
      onVacationClick,
      onEditing,
    }
  },
})
</script>
