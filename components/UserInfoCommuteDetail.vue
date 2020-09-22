<template>
  <v-card :class="`mb-5 ${$round}`" elevation="10">
    <v-card-title class="d-flex align-center">
      노예 계약 현황
      <v-switch
        class="is-work-switch ma-0 ml-auto pa-0"
        color="primary"
        inset
        hide-details
        dense
        value
      />
    </v-card-title>
    <v-card-text>
      <row class="mb-3" title="출근 시간" :disabled="!item.isWork" @click="onRowClick('출근')">
        <span class="body-1 font-weight-bold">{{ item.workStartTime }}</span>
      </row>
      <row class="mb-3" title="퇴근 시간" :disabled="!item.isWork" @click="onRowClick('퇴근')">
        <span class="body-1 font-weight-bold">{{ item.workEndTime }}</span>
      </row>
      <row class="mb-3" title="점심 시간" :disabled="!item.isWork" @click="onRowClick('점심')">
        <span class="body-1 font-weight-bold">{{ lunchTime }}</span>
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
  setup(props, context) {
    const onRowClick = (key: string) => {
      context.emit('click', key)
    }

    const lunchTime = `${props.item.lunchStartTime} ~ ${props.item.lunchEndTime}`

    return {
      onRowClick,
      lunchTime,
    }
  },
})
</script>

<style lang="scss" scoped>
.d-flex {
  .is-work-switch {
    width: 44px;
  }
}
</style>
