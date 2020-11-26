<template>
  <v-card
    :class="[$round, { edit }]"
    elevation="10"
    :ripple="!edit"
    :draggable="true"
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
import { defineComponent } from '@vue/composition-api'
import { useState, useCardTouchStart, useCardTouchEnd } from './dash-board-card.fn'

export default defineComponent({
  name: 'DashBoardCard',
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
    const state = useState()
    const onCardTouchStart = useCardTouchStart(context, state)
    const onCardTouchEnd = useCardTouchEnd(state)

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
