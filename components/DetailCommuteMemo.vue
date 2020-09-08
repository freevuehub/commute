<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-textarea
        v-if="memoEdit"
        v-model="state.memo"
        label="메모"
        rows="1"
        auto-grow
        outlined
        clear-icon
        hide-details
      ></v-textarea>
      <span v-else>{{ comment || '메모가 없습니다.' }}</span>
    </v-card-text>
    <v-card-actions v-if="memoEdit">
      <v-spacer></v-spacer>
      <v-btn @click="onMemoSave" text small color="primary">저장</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  props: {
    comment: {
      type: String,
      default: '',
    },
    memoEdit: Boolean,
  },
  model: {
    prop: 'memoEdit',
    event: 'close',
  },
  setup(props, context) {
    const state = reactive({
      memo: props.comment,
    })
    const onMemoSave = () => {
      context.emit('close', !props.memoEdit)
    }

    return {
      state,
      onMemoSave,
    }
  },
})
</script>
