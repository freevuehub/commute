<template>
  <v-container>
    <div class="d-flex mb-5">
      <v-spacer></v-spacer>
      <v-btn color="primary">추가</v-btn>
    </div>
    <v-simple-table class="mb-5 commute-list">
      <template v-slot:default>
        <simple-table-header :headers="state.headers" />
        <simple-table-body :list="computed.commuteList" @click="onCommuteItemClick" />
      </template>
    </v-simple-table>
    <pagination v-model="state.page" :max="state.limit" :total="computed.total" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, SetupContext, watch } from '@vue/composition-api'
import {
  useState,
  useComputed,
  useBeforeMounted,
  useCommuteItemClick,
  usePageWatch,
} from './index.fn'
import { SimpleTableHeader, SimpleTableBody, Pagination } from '~/components'

export default defineComponent({
  components: {
    SimpleTableHeader,
    SimpleTableBody,
    Pagination,
  },
  setup(_: {}, vm: SetupContext) {
    const state = useState(vm)
    const computed = useComputed(vm)

    onBeforeMount(useBeforeMounted(vm, state))

    watch(() => state.page, usePageWatch(vm, state))

    return {
      state,
      computed,
      onCommuteItemClick: useCommuteItemClick(vm),
    }
  },
})
</script>

<style lang="scss">
.commute-list {
  table {
    width: max-content !important;
  }
}
</style>
