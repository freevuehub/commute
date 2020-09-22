<template>
  <v-card :class="$round" elevation="10">
    <v-card-title>
      <span class="font-weight-bold">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <slot name="before"></slot>
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
