import { reactive, computed, ComputedRef, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { AuthConstant, SnackConstant, CompanyConstant } from '~/constant'
import { IUserInfo } from '~/types'
import { makeTerm, makeDefaultFormat } from '~/utile'

interface IState {
  isWork: boolean
  switchLoading: boolean
  itmeModal: boolean
  dialog: boolean
  lunchModal: boolean
  time: string
  type: string
}

interface IComputedItem {
  userInfo: IUserInfo
  minTime: string | undefined
  maxTime: string | undefined
}

interface IComputed {
  userInfo: ComputedRef<IComputedItem['userInfo']>
  minTime: ComputedRef<IComputedItem['minTime']>
  maxTime: ComputedRef<IComputedItem['maxTime']>
}

const buildTimeSet = (time: string) => `${dayjs().format('YYYY-MM-DD')} ${time}`
const maybeTimeSet = (time: string | null | undefined) => {
  return time ? dayjs(buildTimeSet(time)).format('HH:mm') : 'N/A'
}

export const useState = () =>
  reactive<IState>({
    isWork: true,
    switchLoading: false,
    itmeModal: false,
    dialog: false,
    lunchModal: false,
    time: '',
    type: '',
  })

export const useComputed = (context: SetupContext, state: IState) =>
  reactive<IComputed>({
    userInfo: computed(() => {
      const infoData: IUserInfo = context.root.$store.getters[`auth/${AuthConstant.$Get.Info}`]

      return {
        ...infoData,
        workStartTime: maybeTimeSet(infoData.workStartTime),
        workEndTime: maybeTimeSet(infoData.workEndTime),
        lunchStartTime: maybeTimeSet(infoData.lunchStartTime),
        lunchEndTime: maybeTimeSet(infoData.lunchEndTime),
      }
    }),
    minTime: computed(() => {
      const infoData: IUserInfo = context.root.$store.getters[`auth/${AuthConstant.$Get.Info}`]

      return state.type === '퇴근'
        ? dayjs(buildTimeSet(infoData.workStartTime)).format('HH:mm')
        : undefined
    }),
    maxTime: computed(() => {
      const infoData: IUserInfo = context.root.$store.getters[`auth/${AuthConstant.$Get.Info}`]

      return state.type === '출근'
        ? dayjs(buildTimeSet(infoData.workEndTime)).format('HH:mm')
        : undefined
    }),
  })

export const useRowClick = (state: IState, computed: IComputedItem) => (value: string) => {
  if (value === '점심') {
    state.lunchModal = true
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

export const useSaveClick = (
  context: SetupContext,
  state: IState,
  computed: IComputedItem
) => async () => {
  const bulidTimekey = () => {
    switch (state.type) {
      case '출근':
        return {
          workStartTime: state.time,
          workTerm: makeTerm(
            makeDefaultFormat(state.time),
            makeDefaultFormat(computed.userInfo.workEndTime)
          ),
        }
      case '퇴근':
        return {
          workEndTime: state.time,
          workTerm: makeTerm(
            makeDefaultFormat(computed.userInfo.workStartTime),
            makeDefaultFormat(state.time)
          ),
        }
      default:
        return ''
    }
  }

  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, bulidTimekey())

  context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '수정되었습니다.')

  state.itmeModal = false
}

export const useCompanySave = (context: SetupContext, state: IState) => async (value: number) => {
  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, { companyId: value })

  context.root.$store.dispatch(`company/${CompanyConstant.$Call.ListReset}`)
  context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '수정되었습니다.')

  state.dialog = false
}
