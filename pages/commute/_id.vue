<template>
  <v-container>
    <v-dialog v-model="state.loading" persistent>
      <div class="pa-3 text-center">
        <v-progress-circular :size="50" indeterminate color="primary" />
      </div>
    </v-dialog>

    <v-dialog ref="dialog" v-model="state.modal">
      <v-time-picker v-if="state.modal" v-model="state.time" full-width color="primary">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="state.modal = false">닫기</v-btn>
        <v-btn text color="primary" @click="onSaveClick">{{ state.type }}</v-btn>
      </v-time-picker>
    </v-dialog>

    <h2 class="mb-2">출퇴근 정보</h2>
    <commute-info :item="computed.item" @click="onRowClick" />

    <h2 class="mb-2">회사 정보</h2>

    <!-- <v-card v-if="!computed.item.id" class="mb-5">
      <v-skeleton-loader type="image"></v-skeleton-loader>
      <v-card-text>
        <v-skeleton-loader type="text"></v-skeleton-loader>
      </v-card-text>
    </v-card>-->
    <company-info :item="computed.item" />

    <h2 class="mb-2 d-flex align-center">
      메모
      <v-btn x-small icon class="ml-1" @click="state.memoEdit = !state.memoEdit">
        <v-icon>edit</v-icon>
      </v-btn>
    </h2>
    <memo v-model="state.memoEdit" :comment="computed.item.comment" />

    <v-chip class="ma-2" close color="teal" text-color="white" @click:close="close">tags</v-chip>

    <div class="d-flex mt-10">
      <v-spacer></v-spacer>
      <v-btn nuxt color="primary" @click="$router.go(-1)">돌아가기</v-btn>
      <v-spacer></v-spacer>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onBeforeMount } from '@vue/composition-api'
import { useState, useSaveClick, useRowClick, useComputed, useBeforeMounted } from './id.fn'
import { DetailCommuteInfo, DetailCompanyInfo, DetailCommuteMemo } from '~/components'

export default defineComponent({
  components: {
    commuteInfo: DetailCommuteInfo,
    companyInfo: DetailCompanyInfo,
    memo: DetailCommuteMemo,
  },
  setup(_: {}, context: SetupContext) {
    const state = useState()
    const computed = useComputed(context)
    const onSaveClick = useSaveClick(state, computed, context)
    const onRowClick = useRowClick(state, computed)
    const close = () => {
      alert('Chip close clicked')
    }

    onBeforeMount(useBeforeMounted(state, context))

    return {
      state,
      computed,
      onSaveClick,
      onRowClick,
      close,
    }
  },
})
</script>

<style lang="scss">
.address {
  width: 70%;
  text-align: right;
  word-break: keep-all;
  margin-left: auto;
  display: block;
}
</style>
