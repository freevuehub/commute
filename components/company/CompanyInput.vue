<template>
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
    return-object
    hide-details
    no-data-text="아직 창업을 안했나봐요.."
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.companyName }}</v-list-item-title>
        <v-list-item-subtitle>{{ data.item.industryName }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api'
import {
  useState,
  useComputed,
  useSearchTextWatch,
  useSearchFilter,
  useSelectCompanyWatch,
} from './company-input.fn'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  setup(_, context) {
    const state = useState()
    const computed = useComputed(context)
    const onSearchFilter = useSearchFilter()

    watch(() => state.searchText, useSearchTextWatch(context, state))
    watch(() => state.selectCompany, useSelectCompanyWatch(context))

    return {
      state,
      computed,
      onSearchFilter,
    }
  },
})
</script>
