<template>
  <v-card>
    <v-card-title class="headline">이직을 하셨나요?</v-card-title>
    <v-card-text>
      <v-autocomplete
        v-model="state.selectCompany"
        :items="computed.companyList"
        :loading="state.searchLoading"
        :search-input.sync="state.searchText"
        :filter="onSearchFilter"
        item-value="id"
        item-text="companyName"
        label="회사 이름"
        dense
        outlined
        hide-details
        no-data-text="아직 창업을 안했나봐요.."
      >
        <template v-slot:item="data">
          <v-list-item-content>
            <v-list-item-title>{{ data.item.companyName }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.item.contact }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="onClose">닫기</v-btn>
      <v-btn color="primary" text @click="$emit('close')">이직</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import {
  useClose,
  uesState,
  useComputed,
  useSearchTextWatch,
  useSearchFilter,
} from './company-search-card.fn'
import { SimpleTableHeader } from '~/components'

export default defineComponent({
  components: {
    SimpleTableHeader,
  },
  setup(_, context) {
    const state = uesState()
    const computed = useComputed(context)
    const onClose = useClose(context)
    const onSearchFilter = useSearchFilter(state)

    watch(() => state.searchText, useSearchTextWatch(context, state))

    return {
      state,
      computed,
      onClose,
      onSearchFilter,
    }
  },
})
</script>
