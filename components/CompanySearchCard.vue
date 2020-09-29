<template>
  <v-card :class="$round" elevation="10">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <!-- <search v-model="state.selectCompany" class="mb-3" /> -->
      <v-expand-transition>
        <company v-if="state.selectCompany.companyName" :item="state.selectCompany" min outlined />
      </v-expand-transition>
    </v-card-text>
    <v-card-actions v-if="computed.isActions">
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
import { DetailCompanyInfo, SearchCompany } from '~/components'

export default defineComponent({
  name: 'CompanySearchCard',
  components: {
    company: DetailCompanyInfo,
    search: SearchCompany,
  },
  props: {
    title: String,
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
