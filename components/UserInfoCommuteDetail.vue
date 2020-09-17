<template>
  <v-card class="mb-5">
    <v-card-text>
      <row class="mb-3" title="출근 시간" :disabled="!item.isWork" @click="onRowClick('출근')">
        <span class="body-1 font-weight-bold">{{ item.workStartTime }}</span>
      </row>
      <row class="mb-3" title="퇴근 시간" :disabled="!item.isWork" @click="onRowClick('퇴근')">
        <span class="body-1 font-weight-bold">{{ item.workEndTime }}</span>
      </row>
      <row class="mb-3" title="점심 시간" :disabled="!item.isWork" @click="onRowClick('점심')">
        <span class="body-1 font-weight-bold">
          {{ `${item.lunchStartTime} ~ ${item.lunchEndTime}` }}
        </span>
      </row>
      <v-divider class="mb-2"></v-divider>
      <row>
        <span v-if="item.isWork">현재 노예 계약된 상태입니다..</span>
        <span v-else>당신은 자유민입니다!</span>
      </row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
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
  setup(_, context) {
    const onRowClick = (key: string) => {
      context.emit('click', key)
    }

    return {
      onRowClick,
    }
  },
})
</script>
