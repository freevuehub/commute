<template>
  <v-container fluid>
    <info-title />
    <v-divider class="my-6"></v-divider>
    <h2 class="mb-2 d-flex align-center">
      노예 계약 현황
      <v-switch
        class="is-work-switch ma-0 ml-auto pa-0"
        color="primary"
        inset
        hide-details
        dense
        value
        :input-value="computed.userInfo.isWork"
        @change="onSwitchChange"
      />
    </h2>
    <v-card class="mb-5">
      <v-card-text>
        <row class="mb-3" title="출근 시간">
          <span class="body-1 font-weight-bold">{{ computed.userInfo.workStartTime }}</span>
        </row>
        <row class="mb-3" title="퇴근 시간">
          <span class="body-1 font-weight-bold">{{ computed.userInfo.workEndTime }}</span>
        </row>
        <row class="mb-3" title="점심 시간">
          <span class="body-1 font-weight-bold">{{ `${computed.userInfo.workEndTime}` }}</span>
        </row>
        <v-divider class="mb-2"></v-divider>
        <row>
          <span>현재 노예 계약된 상태입니다..</span>
        </row>
      </v-card-text>
    </v-card>
    <h2 class="mb-2">주인마님 댁</h2>
    <company-info :item="computed.userInfo" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed } from './my-page.fn'
import { CommuteDetailRow, DetailCompanyInfo, UserInfoTitle } from '~/components'

export default defineComponent({
  middleware: ['my-page'],
  components: {
    row: CommuteDetailRow,
    companyInfo: DetailCompanyInfo,
    infoTitle: UserInfoTitle,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(_, context) {
    const state = useState()
    const computed = useComputed(context)
    const onSwitchChange = (value: boolean) => {
      console.log(value)
    }

    return {
      state,
      computed,
      onSwitchChange,
    }
  },
})
</script>

<style lang="scss">
.is-work-switch {
  width: 44px;
}
</style>
