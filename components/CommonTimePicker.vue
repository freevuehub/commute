<template>
  <v-time-picker v-model="state.time" full-width color="primary">
    <v-spacer></v-spacer>
    <v-btn text color="primary" @click="$emit('close')">닫기</v-btn>
    <v-btn text color="primary" @click="$emit('save')">저장</v-btn>
  </v-time-picker>
</template>

<script>
import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
  props: {
    time: String,
  },
  model: {
    prop: 'time',
    event: 'change',
  },
  setup(props, context) {
    const state = reactive({
      time: props.time,
    })

    watch(
      () => state.time,
      (value) => {
        context.emit('change', value)
      }
    )

    return {
      state,
    }
  },
})
</script>
