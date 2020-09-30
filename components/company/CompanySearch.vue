<template>
  <v-card :class="$round" elevation="10">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <test v-model="state.selectCompany" class="mb-3" />
      <v-expand-transition>
        <DetailCompanyInfo
          v-if="state.selectCompany.companyName"
          :item="state.selectCompany"
          min
          outlined
        />
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
import { useClose, useSave, useState, useComputed } from './company-search.fn'
import { DetailCompanyInfo, CompanyInput } from './'

export default defineComponent({
  components: {
    DetailCompanyInfo,
    test: CompanyInput,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(_, context) {
    const state = useState()
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
