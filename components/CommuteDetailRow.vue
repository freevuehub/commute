<template>
  <div class="d-flex align-start">
    <span class="body-1 font-weight-light">{{ title }}</span>
    <v-spacer></v-spacer>
    <button
      v-if="state.isClick"
      :disabled="disabled"
      class="pa-0"
      :class="disabled && 'text-decoration-line-through'"
      @click.prevent="$emit('click')"
    >
      <slot />
    </button>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { listeners }) {
    const state = reactive({
      isClick: computed(() => {
        return !!listeners.click
      }),
    })

    return {
      state,
    }
  },
})
</script>
