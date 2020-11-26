<template>
  <v-card
    :class="[$round, { edit }]"
    elevation="10"
    :ripple="!edit"
    @touchstart="onCardTouchStart"
    @touchend="onCardTouchEnd"
  >
    <v-card-title>
      <span class="font-weight-bold">{{ title }}</span>
      <v-fade-transition>
        <v-btn v-if="edit" icon small absolute right center>
          <v-icon>drag_handle</v-icon>
        </v-btn>
      </v-fade-transition>
    </v-card-title>
    <slot />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'DashCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const state = reactive<{ timeout: ReturnType<typeof setTimeout> | null }>({
      timeout: null,
    })
    const onCardTouchStart = () => {
      const useTimeOut = () => {
        context.emit('editing', true)
      }

      state.timeout = setTimeout(useTimeOut, 2000)
    }
    const onCardTouchEnd = () => {
      if (state.timeout !== null) {
        clearTimeout(state.timeout)
      }
    }

    return {
      state,
      onCardTouchStart,
      onCardTouchEnd,
    }
  },
})
</script>

<style lang="scss" scoped>
.edit {
  animation: shake infinite 0.4s linear;
}

@keyframes shake {
  0% {
    transform: translateY(3px);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(3px);
  }
}
</style>
