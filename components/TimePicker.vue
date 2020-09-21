<template>
  <v-time-picker
    color="primary"
    :value="time"
    format="ampm"
    full-width
    :min="min || null"
    :max="max || null"
    @input="onTimeInput"
  />
</template>

<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'

interface IProps {
  time: string
}

export default defineComponent({
  props: {
    time: String,
    min: String,
    max: String,
  },
  model: {
    prop: 'time',
    event: 'input',
  },
  setup<IProps>(_: IProps, { emit }: SetupContext) {
    const onTimeInput = (value: string) => {
      emit('input', value)
    }

    return {
      onTimeInput,
    }
  },
})
</script>
