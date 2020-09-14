import dayjs from 'dayjs'
import { SetupContext, reactive, computed } from '@vue/composition-api'
import { MainConstant, AuthConstant } from '~/constant'
import instance from '~/API/instance'

export const useState = () =>
  reactive({
    drawer: false,
  })

export const useComputed = (context: SetupContext) =>
  reactive({
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

export const useSiginOutClick = (context: SetupContext) => () => {
  const { $cookies }: any = context.root

  $cookies.remove('token')

  context.root.$router.push('/signin')
}

export const useBeforeMount = (context: SetupContext) => () => {
  instance.interceptors.response.use(
    (response) => {
      if (response.data.status === 2000) {
        return response
      } else if (response.data.status === 4010) {
        const { $cookies }: any = context.root

        $cookies.remove('token')

        context.root.$router.push('/signin')
      }

      return Promise.reject(response)
    },
    (error) => {
      return Promise.reject(error.response)
    }
  )
}

export const useMounted = (context: SetupContext) => async () => {
  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.User}`)
}
