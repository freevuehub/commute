<template>
  <v-card :class="`mb-5 ${$round}`" elevation="10">
    <v-card-text>
      <row class="mb-3" title="일자">
        <span class="body-1 font-weight-bold">{{ item.date }}</span>
      </row>
      <row class="mb-3" title="출근시간" @click="onRowClick('출근')">
        <span class="body-1 font-weight-bold">{{ item.startTime }}</span>
      </row>
      <row class="mb-3" title="퇴근시간" @click="onRowClick('퇴근')">
        <span class="body-1 font-weight-bold">{{ item.endTime }}</span>
      </row>
      <row title="총 근무시간">
        <span class="body-1 font-weight-bold">{{ item.workTime }}</span>
      </row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { CommuteDetailRow } from './'

export default defineComponent({
  components: {
    row: CommuteDetailRow,
  },
  props: ['item'],
  setup(_, { emit }: SetupContext) {
    const onRowClick = (key: string) => {
      emit('click', key)
    }

    return {
      onRowClick,
    }
  },
})
</script>
