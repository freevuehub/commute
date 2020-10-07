<template>
  <v-card outlined :class="`${$round} mb-5`" color="primary" elevation="0" dark>
    <v-card-text>
      <v-sparkline
        class="text--primary"
        :value="values"
        :auto-draw-duration="300"
        auto-line-width
        auto-draw
        type="bar"
        :show-labels="true"
        :label-size="14"
        :labels="labels"
        :smooth="5"
      >
        <template v-slot:label="item">{{ item.value }}</template>
      </v-sparkline>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
