<template>
  <v-card :class="$round" elevation="10">
    <v-card-title class="d-flex align-center">
      메모
      <v-btn x-small icon class="ml-1" @click="state.editOn = !state.editOn">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-textarea
        v-if="state.editOn"
        v-model="state.memo"
        label="메모"
        rows="1"
        auto-grow
        outlined
        clear-icon
        hide-details
      ></v-textarea>
      <div v-else>
        <template v-for="(text, index) in computed.memo">
          <span v-if="text" :key="`span-${index}`">{{ text }}</span>
          <br :key="`br-${index}`" />
        </template>
      </div>
    </v-card-text>
    <v-card-actions v-if="state.editOn">
      <v-spacer></v-spacer>
      <v-btn text small color="primary" @click="onMemoSave">저장</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { useState, useComputed, useMemoSave, useCommentWatch } from './DetailCommuteMemo.fn'

export default defineComponent({
  props: {
    comment: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const state = useState(props)
    const computed = useComputed(props)
    const onMemoSave = useMemoSave(context, state)

    watch(() => props.comment, useCommentWatch(state))

    return {
      state,
      computed,
      onMemoSave,
    }
  },
})
</script>
