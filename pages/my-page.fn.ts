import { reactive, computed, ComputedRef, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { AuthConstant, SnackConstant } from '~/constant'
import { IUserInfo } from '~/types'

interface IState {
  isWork: boolean
  switchLoading: boolean
  itmeModal: boolean
  dialog: boolean
  time: string
  type: string
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
    dialog: false,
    time: '',
    type: '',
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
        lunchStartTime: infoData.lunchStartTime
          ? dayjs(buildTimeSet(infoData.lunchStartTime)).format('HH:mm')
          : 'N/A',
        lunchEndTime: infoData.lunchEndTime
          ? dayjs(buildTimeSet(infoData.lunchEndTime)).format('HH:mm')
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
  if (value === '점심') {
    console.log('test')
  } else {
    state.type = value

    const findTimeValue = () => {
      switch (state.type) {
        case '출근':
          return computed.userInfo.workStartTime
        case '퇴근':
          return computed.userInfo.workEndTime
        default:
          return dayjs().format('HH:mm')
      }
    }

    state.itmeModal = true
    state.time = findTimeValue()
  }
}

export const useSaveClick = (context: SetupContext, state: IState) => async () => {
  const bulidTimekey = (): string => {
    switch (state.type) {
      case '출근':
        return 'workStartTime'
      case '퇴근':
        return 'workEndTime'
      default:
        return ''
    }
  }

  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, {
    [bulidTimekey()]: state.time,
  })

  context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '수정되었습니다.')

  state.itmeModal = false
}
