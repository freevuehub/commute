<template>
  <v-app dark>
    <v-navigation-drawer v-model="state.drawer" fixed app>
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
import { defineComponent, reactive, computed, SetupContext } from '@vue/composition-api'
import { SnackBar } from '~/containers'
import { DefaultFooter } from '~/components'
import { MainConstant } from '~/constant'

export default defineComponent({
  components: {
    DefaultFooter,
    SnackBar,
  },
  setup(_: {}, vm: SetupContext) {
    const state = reactive({
      drawer: false,
      items: [
        {
          icon: 'home',
          title: '메인 페이지',
          to: '/',
        },
        {
          icon: 'timelapse',
          title: '출퇴근 리스트',
          to: '/commute',
        },
      ],
    })
    const title = reactive({
      str: computed(() => {
        const item = vm.root.$store.getters[`main/${MainConstant.$Get.MainData}`]

        switch (dayjs().day()) {
          case 0:
            return '오늘도 출근해요?'
          case 6:
            return '오늘도 출근해요?'
          default:
            return item.todayData.startDate
              ? item.todayData.endDate
                ? '수고했어요~'
                : '퇴근할 시간이야!'
              : '출근할 시간이야!'
        }
      }),
    })

    return {
      state,
      title,
    }
  },
})
</script>
