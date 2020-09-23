<template>
  <v-card>
    <v-card-title class="headline">이직을 하셨나요?</v-card-title>
    <v-card-text>
      <search v-model="state.selectCompany" class="mb-3" />
      <company v-if="state.selectCompany.companyName" :item="state.selectCompany" min />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="onClose">닫기</v-btn>
      <v-btn color="primary" :disabled="!state.selectCompany.companyName" text @click="onSave">
        <span>이직</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useClose, useSave, uesState, useComputed } from './company-search-card.fn'
import { SimpleTableHeader, DetailCompanyInfo, CompanyAutoSearchForm } from './'

export default defineComponent({
  components: {
    SimpleTableHeader,
    company: DetailCompanyInfo,
    search: CompanyAutoSearchForm,
  },
  setup(_, context) {
    const state = uesState()
    const computed = useComputed(context)
    const onClose = useClose(context)
    const onSave = useSave(context, state)

    return {
      state,
      computed,
      onSave,
      onClose,
    }
  },
})
</script>
