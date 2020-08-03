<template>
  <v-container fluid>
    <v-simple-table class="mb-5">
      <template v-slot:default>
        <simple-table-header :headers="state.headers" />
        <simple-table-body :list="computed.commuteList" @click="onCommuteItemClick" />
      </template>
    </v-simple-table>
    <v-pagination />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, SetupContext } from '@vue/composition-api'
import { useState, useComputed, useBeforeMounted, useCommuteItemClick } from './index.fn'
import { SimpleTableHeader, SimpleTableBody } from '~/components'

export default defineComponent({
  components: {
    SimpleTableHeader,
    SimpleTableBody,
  },
  setup(_: {}, vm: SetupContext) {
    const state = useState()
    const computed = useComputed(vm)

    onBeforeMount(useBeforeMounted(vm))

    return {
      state,
      computed,
      onCommuteItemClick: useCommuteItemClick(vm),
    }
  },
})
</script>
