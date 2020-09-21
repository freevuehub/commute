<template>
  <v-card flat tile>
    <v-window v-model="state.window" class="elevation-1">
      <v-window-item value="startTime" :max="state.end">
        <time-picker v-model="state.start" />
      </v-window-item>
      <v-window-item value="endTime">
        <time-picker v-model="state.end" :min="state.start" />
      </v-window-item>
    </v-window>
    <v-card-actions class="justify-space-between">
      <v-btn text :disabled="state.window === 'startTime'" @click="state.window = 'startTime'">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      {{ computed.title }}
      <v-btn text :disabled="state.window === 'endTime'" @click="state.window = 'endTime'">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { useState, useComputed, useStartWatch } from './lunch-time-selecter.fn'
import { TimePicker } from './'

export default defineComponent({
  components: {
    timePicker: TimePicker,
  },
  props: {
    start: {
      type: String,
      default: '',
    },
    end: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = useState(props)
    const computed = useComputed(state)

    watch(() => state.start, useStartWatch)

    return {
      state,
      computed,
    }
  },
})
</script>
