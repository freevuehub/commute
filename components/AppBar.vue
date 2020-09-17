<template>
  <v-app-bar fixed app color="primary">
    <v-app-bar-nav-icon @click.stop="$emit('click')" />
    <v-spacer />
    <v-toolbar-title v-text="state.titleStrList[number]" />
  </v-app-bar>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      titleStrList: [
        '힘내라! 직장인!',
        '출!사표',
        '직장인 딴짓 프로젝트',
        '내가 출퇴근 관리한다.',
        '루팡하기 좋은 날이다.',
        '일 안하고 부자되자!',
      ],
    })
    const number = Math.floor(Math.random() * state.titleStrList.length)

    return {
      state,
      number,
    }
  },
})
</script>
