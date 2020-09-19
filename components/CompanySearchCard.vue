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
      <company
        v-if="state.selectCompany.companyName"
        :item="state.selectCompany"
        min
        class="mt-3"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="onClose">닫기</v-btn>
      <v-btn color="primary" :disabled="!state.selectCompany.companyName" text @click="onSave"
        >이직</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import {
  useClose,
  useSave,
  uesState,
  useComputed,
  useSearchTextWatch,
  useSearchFilter,
} from './company-search-card.fn'
import { SimpleTableHeader, DetailCompanyInfo } from '~/components'

export default defineComponent({
  components: {
    SimpleTableHeader,
    company: DetailCompanyInfo,
  },
  setup(_, context) {
    const state = uesState()
    const computed = useComputed(context)
    const onClose = useClose(context)
    const onSave = useSave(context, state)
    const onSearchFilter = useSearchFilter()

    watch(() => state.searchText, useSearchTextWatch(context, state))

    return {
      state,
      computed,
      onSave,
      onClose,
      onSearchFilter,
    }
  },
})
</script>
