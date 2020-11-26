<template>
  <v-card color="primary" :class="$round" elevation="0" dark>
    <v-card-text>
      <span class="font-weight-light text--primary">{{ name }}님의 이번달 근무시간입니다.</span>
      <h3 class="mt-2 font-weight-black text--primary">
        평균: {{ month.monthTermAvg }} / 초과: {{ month.monthOverTime }}
      </h3>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useComputed } from './month-total-data.fn'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup(_, context) {
    const computed = useComputed(context)

    return {
      ...computed,
    }
  },
})
</script>
