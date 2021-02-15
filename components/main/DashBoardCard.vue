<template>
  <v-card
    ref="dash-card"
    elevation="10"
    :class="[$round]"
    :ripple="!edit"
    :style="styleSet"
    @touchstart="onCardTouchStart"
    @touchend="onCardTouchEnd"
  >
    <v-card-title>
      <span class="font-weight-bold">{{ title }}</span>
      <v-fade-transition>
        <v-btn
          v-if="edit"
          icon
          small
          absolute
          right
          center
          @touchstart="onCardMoveStart"
          @touchmove="onCardMove"
          @touchend="onCardMoveEnd"
        >
          <v-icon>drag_handle</v-icon>
        </v-btn>
      </v-fade-transition>
    </v-card-title>
    <slot />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {
  useState,
  useComputed,
  useCardTouchStart,
  useCardTouchEnd,
  useCardMoveStart,
  useCardMove,
  useCardMoveEnd,
} from './dash-board-card.fn'

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
    const computed = useComputed(state)
    const onCardTouchStart = useCardTouchStart(context, state)
    const onCardTouchEnd = useCardTouchEnd(state)
    const onCardMoveStart = useCardMoveStart(state)
    const onCardMove = useCardMove(context, state)
    const onCardMoveEnd = useCardMoveEnd(state)

    return {
      state,
      ...computed,
      onCardTouchStart,
      onCardTouchEnd,
      onCardMoveStart,
      onCardMove,
      onCardMoveEnd,
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
