<template>
  <v-card class="d-flex mb-5">
    <div>
      <v-card-title class="headline">{{ computed.type }}시간</v-card-title>
      <v-card-subtitle>{{ dateTime }}</v-card-subtitle>
    </div>
    <v-card-actions class="ml-auto">
      <v-btn color="primary" :disabled="computed.isDate" @click="onStartClick"
        >{{ computed.type }} {{ computed.isDate ? '완료' : '' }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { SetupContext, defineComponent } from '@vue/composition-api'
import { useComputed, IProps } from './time-save-card.fn'

export default defineComponent({
  props: {
    dateTime: String,
    type: String,
  },
  setup(props: IProps, { emit }: SetupContext) {
    const computed = useComputed(props)
    const onStartClick = () => {
      emit('click')
    }

    return { computed, onStartClick }
  },
})
</script>
