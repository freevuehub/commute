import { SetupContext, reactive, computed } from '@vue/composition-api'
import { AuthConstant } from '~/constant'
import instance, { AxiosRequestConfig } from '~/API/instance'

export const useState = () =>
  reactive({
    drawer: false,
  })

export const useComputed = () =>
  reactive({
    title: computed(() => {
      const titleStrList = [
        '힘내라! 직장인!',
        '출!사표',
        '직장인 딴짓 프로젝트',
        '내가 출퇴근 관리한다.',
        '루팡하기 좋은 날이다.',
        '일 안하고 부자되자!',
      ]
      const randomNumber = Math.floor(Math.random() * titleStrList.length)

      return titleStrList[randomNumber]
    }),
  })

export const useSiginOutClick = (context: SetupContext) => () => {
  const { $cookies }: any = context.root

  $cookies.remove('token')

  context.root.$router.push('/signin')
}

export const useBeforeMount = (context: SetupContext) => () => {
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const { $cookies }: any = context.root

    config.headers = { authorization: $cookies.get('token') }

    return config
  })

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
  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.Profile}`)
}
