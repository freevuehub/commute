<template>
  <v-container fluid>
    <info-title :status="computed.userInfo.isWork" />
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
        :loading="state.switchLoading"
        :disabled="state.switchLoading"
        @change="onSwitchChange"
      />
    </h2>
    <info-detail :item="computed.userInfo" />
    <h2 class="mb-2">주인마님 댁</h2>
    <company-info :item="computed.userInfo" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useComputed, useSwitchChange } from './my-page.fn'
import { DetailCompanyInfo, UserInfoTitle, UserInfoCommuteDetail } from '~/components'

export default defineComponent({
  middleware: ['my-page'],
  components: {
    companyInfo: DetailCompanyInfo,
    infoTitle: UserInfoTitle,
    infoDetail: UserInfoCommuteDetail,
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
    const onSwitchChange = useSwitchChange(context, state)

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
