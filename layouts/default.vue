<template>
  <v-app dark>
    <v-navigation-drawer v-model="state.drawer" fixed app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>사용자 이름</v-list-item-title>

        <v-btn icon>
          <v-icon>settings</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <nav-list />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn outlined block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title.str" />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <default-footer />
    <snack-bar />
  </v-app>
</template>

<script lang="ts">
import 'vuetify/dist/vuetify.min.css'

import dayjs from 'dayjs'
import { defineComponent, reactive, computed } from '@vue/composition-api'
import { SnackBar, DefaultFooter, NavList } from '~/components'
import { MainConstant } from '~/constant'

export default defineComponent({
  components: {
    DefaultFooter,
    SnackBar,
    NavList,
  },
  setup(_, context) {
    const state = reactive({
      drawer: false,
    })
    const title = reactive({
      str: computed(() => {
        const item = context.root.$store.getters[`main/${MainConstant.$Get.MainData}`]
        const diffMinute = dayjs().diff(item.todayData.startDate, 'minute')

        switch (dayjs().day()) {
          case 0:
            return '오늘도 출근해요?'
          case 6:
            return '오늘도 출근해요?'
        }

        if (diffMinute < 240) {
          return '수고하세요~'
        }

        return item.todayData.startDate
          ? item.todayData.endDate
            ? '수고했어요~'
            : '퇴근할 시간이야!'
          : '출근할 시간이야!'
      }),
    })

    return {
      state,
      title,
    }
  },
})
</script>
