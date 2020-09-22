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

    <v-row>
      <v-col cols="12">
        <commute-info :item="computed.item" @click="onRowClick" />
      </v-col>
      <v-col cols="12">
        <memo :comment="computed.item.comment" />
      </v-col>
    </v-row>

    <div v-if="false" class="mb-5">
      <!-- <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">재택근무</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">리프레쉬 데이</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">오후 반차</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">반차</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">오전 반차</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">지각</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">야근</v-chip>
      <v-chip class="mx-1 mb-2" close color="teal" text-color="white" @click:close="close">외근</v-chip>-->
      <v-chip class="mx-1 mb-2 pa-1" color="primary" text-color="white">
        <!-- <v-avatar left>
        </v-avatar>-->
        <v-icon>add</v-icon>
      </v-chip>
    </div>

    <div class="d-flex mt-5">
      <v-spacer></v-spacer>
      <v-btn nuxt color="primary" @click="$router.go(-1)">돌아가기</v-btn>
      <v-spacer></v-spacer>
    </div>

    <v-divider class="my-5"></v-divider>

    <h2 class="mb-2">회사 정보</h2>
    <company-info :item="computed.item.company" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useState, useSaveClick, useRowClick, useComputed } from './id.fn'
import { DetailCommuteInfo, DetailCompanyInfo, DetailCommuteMemo } from '~/components'

export default defineComponent({
  middleware: ['commute-id'],
  components: {
    commuteInfo: DetailCommuteInfo,
    companyInfo: DetailCompanyInfo,
    memo: DetailCommuteMemo,
  },
  setup(_, context) {
    const state = useState()
    const computed = useComputed(context)
    const onSaveClick = useSaveClick(state, computed, context)
    const onRowClick = useRowClick(state, computed)
    const close = () => {
      alert('Chip close clicked')
    }

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
