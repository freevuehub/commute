<template>
  <v-card-text>
    <slot name="before" />
    <row class="mb-3" title="총 근무시간">
      <span class="body-1 font-weight-bold">
        <slot name="sum">N/A</slot>
      </span>
    </row>
    <row class="mb-3" title="평균 근무시간">
      <span class="body-1 font-weight-bold">
        <slot name="avg">N/A</slot>
      </span>
    </row>
    <row title="초과 근무시간">
      <span class="body-1 font-weight-bold">
        <slot name="over">N/A</slot>
      </span>
    </row>
    <slot name="after"></slot>
  </v-card-text>
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
    edit: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
