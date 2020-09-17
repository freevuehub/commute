<template>
  <v-card class="mb-5">
    <v-card-text>
      <row class="mb-3" :title="`${title} 총 근무시간`">
        <span class="body-1 font-weight-bold">
          <slot name="sum">N/A</slot>
        </span>
      </row>
      <row class="mb-3" :title="`${title} 평균 근무시간`">
        <span class="body-1 font-weight-bold">
          <slot name="avg">N/A</slot>
        </span>
      </row>
      <row :title="`${title} 초과 근무시간`">
        <span class="body-1 font-weight-bold">
          <slot name="over">N/A</slot>
        </span>
      </row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { CommuteDetailRow } from './'

export default defineComponent({
  components: {
    row: CommuteDetailRow,
  },
  props: {
    title: String,
  },
})
</script>
