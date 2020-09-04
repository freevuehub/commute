<template>
  <v-app dark>
    <v-navigation-drawer v-model="state.drawer" fixed app>
      <profile />
      <v-divider></v-divider>
      <nav-list />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn outlined block @click="onSiginOutClick">Logout</v-btn>
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
import { defineComponent, reactive, computed, onMounted } from '@vue/composition-api'
import { SnackBar, DefaultFooter, NavList, NavUserProfile } from '~/components'
import { MainConstant, AuthConstant } from '~/constant'

export default defineComponent({
  middleware: 'auth',
  components: {
    profile: NavUserProfile,
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
    const onSiginOutClick = () => {
      const { $cookies }: any = context.root

      $cookies.remove('token')

      context.root.$router.push('/signin')
    }

    onMounted(async () => {
      await context.root.$store.dispatch(`auth/${AuthConstant.$Call.User}`)
    })

    return {
      state,
      title,
      onSiginOutClick,
    }
  },
})
</script>
