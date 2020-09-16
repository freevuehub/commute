import { reactive, computed, ComputedRef, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { AuthConstant } from '~/constant'
import { IUserInfo } from '~/types'

interface IState {
  isWork: boolean
  switchLoading: boolean
  itmeModal: boolean
  time: string
}

interface IComputedItem {
  userInfo: IUserInfo
}

interface IComputed {
  userInfo: ComputedRef<IComputedItem['userInfo']>
}

const buildTimeSet = (time: string) => `${dayjs().format('YYYY-MM-DD')} ${time}`

export const useState = () =>
  reactive<IState>({
    isWork: true,
    switchLoading: false,
    itmeModal: false,
    time: '',
  })

export const useComputed = (context: SetupContext) =>
  reactive<IComputed>({
    userInfo: computed(() => {
      const infoData: IUserInfo = context.root.$store.getters[`auth/${AuthConstant.$Get.Info}`]

      return {
        ...infoData,
        workStartTime: infoData.workStartTime
          ? dayjs(buildTimeSet(infoData.workStartTime)).format('HH:mm')
          : 'N/A',
        workEndTime: infoData.workEndTime
          ? dayjs(buildTimeSet(infoData.workEndTime)).format('HH:mm')
          : 'N/A',
      }
    }),
  })

export const useSwitchChange = (context: SetupContext, state: IState) => async (value: boolean) => {
  state.switchLoading = !state.switchLoading

  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, { isWork: value })

  state.switchLoading = !state.switchLoading
}

export const useRowClick = (state: IState, computed: IComputedItem) => (value: string) => {
  state.itmeModal = true

  if (value === '출근') {
    state.time = computed.userInfo.workStartTime
  } else if (value === '퇴근') {
    state.time = computed.userInfo.workEndTime
  }
}
