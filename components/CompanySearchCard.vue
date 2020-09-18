<template>
  <v-card>
    <v-card-title class="headline">이직을 하셨나요?</v-card-title>
    <v-card-text>
      <v-text-field v-model.lazy="state.searchText" label="검색" outlined dense></v-text-field>
      <v-card v-if="computed.companyList.length" outlined>
        <v-simple-table class="simple-list">
          <template v-slot:default>
            <simple-table-header :headers="state.headers" />
            <tbody>
              <tr v-for="company in computed.companyList" :key="company.id">
                <td>{{ company.companyName }}</td>
                <td>{{ company.ceoName }}</td>
                <td>{{ company.contact }}</td>
                <td>{{ company.mainBusiness }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-alert v-else-if="state.searchLoading" type="error" dense>
        회사를 검색해보세요.
      </v-alert>
      <v-alert v-else type="info" dense>
        회사를 검색해보세요.
      </v-alert>
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
import { useClose, uesState, useComputed, useSearchTextWatch } from './company-search-card.fn'
import { SimpleTableHeader } from '~/components'

export default defineComponent({
  components: {
    SimpleTableHeader,
  },
  setup(_, context) {
    const state = uesState()
    const computed = useComputed(context)
    const onClose = useClose(context)

    watch(() => state.searchText, useSearchTextWatch(context, state))

    return {
      state,
      computed,
      onClose,
    }
  },
})
</script>
