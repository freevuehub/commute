<template>
  <v-container>
    <v-simple-table class="mb-5 simple-list">
      <template v-slot:default>
        <simple-table-header :headers="state.headers" />
        <simple-table-body :list="computed.commuteList" @click="onCommuteItemClick" />
      </template>
    </v-simple-table>
    <pagination v-model="state.page" :max="state.limit" :total="computed.total" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch } from '@vue/composition-api'
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
  setup(_, context) {
    const state = useState(context)
    const computed = useComputed(context)
    const onCommuteItemClick = useCommuteItemClick(context)

    onBeforeMount(useBeforeMounted(context, state))

    watch(() => state.page, usePageWatch(context, state))

    return {
      state,
      computed,
      onCommuteItemClick,
    }
  },
})
</script>
