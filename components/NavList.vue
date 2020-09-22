<template>
  <v-list>
    <v-list-item v-for="(item, i) in state.items" :key="i" :to="item.to" router exact>
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      items: [
        {
          icon: 'assessment',
          title: '대시보드',
          to: '/',
        },
        {
          icon: 'list',
          title: '출퇴근 데이터',
          to: '/commute',
        },
        {
          icon: 'search',
          title: '회사 검색',
          to: '/company',
        },
      ],
    })

    return {
      state,
    }
  },
})
</script>
