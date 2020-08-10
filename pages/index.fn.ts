import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import { ICommuteItem } from '~/types'
import { MainConstant, SnackConstant, CommuteConstant } from '~/constant'

export interface IState {
  time: string
  date: string
  startLoading: boolean
  endLoading: boolean
  mainData: any
}

export interface IComputed {
  weekBarValue: ComputedRef<number[]>
  weekBarLabels: ComputedRef<string[]>
}

const now = dayjs()

export const useState = ({ root }: SetupContext) =>
  reactive<IState>({
    time: now.format('HH:mm:00'),
    date: now.format('YYYY-MM-DD'),
    startLoading: false,
    endLoading: false,
    mainData: computed(() => {
      const data = root.$store.getters[`main/${MainConstant.$Get.MainData}`]

      return {
        ...data,
        todayData: {
          ...data.todayData,
          startDate: data.todayData.startDate && dayjs(data.todayData.startDate).format('HH:mm'),
          endDate: data.todayData.endDate && dayjs(data.todayData.endDate).format('HH:mm'),
        },
        termAvg: `${Math.floor(data.termAvg / 60)}시간 ${data.termAvg % 60}분`,
        termSum: `${Math.floor(data.termSum / 60)}시간 ${data.termSum % 60}분`,
      }
    }),
  })

export const useComputed = (state: IState) =>
  reactive<IComputed>({
    weekBarValue: computed(() => {
      const { weekList } = state.mainData

      return weekList.map((item: ICommuteItem | null) => (item ? item.totalWorkTime : 0))
    }),
    weekBarLabels: computed(() => {
      const weekNameList = ['일', '월', '화', '수', '목', '금', '토']

      return weekNameList.map((_: string, index: number) => `${dayjs().day(index).format('DD')}일`)
    }),
  })

export const useStartTimeSave = ({ root }: SetupContext, state: IState) => async (key: string) => {
  state.startLoading = true

  console.log(key)

  // await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePost}`, {
  //   companyId: 1,
  //   startDate: `${state.date} ${state.time}:00`,
  //   endDate: null,
  //   comment: null,
  //   tags: null,
  // })

  root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, {
    message: `${state.time}에 출근하셨습니다.`,
    view: true,
    type: 'success',
  })

  state.startLoading = false

  useBeforeMount(root)()
}

export const useEndTimeSave = ({ root }: SetupContext, state: IState) => async () => {
  state.endLoading = true

  await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
    id: state.mainData.id,
    payload: {
      endDate: `${state.date} ${state.time}`,
    },
  })

  root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, {
    message: `${state.time}에 퇴근하셨습니다.`,
    view: true,
    type: 'success',
  })

  state.endLoading = false

  useBeforeMount(root)()
}

export const useBeforeMount = (root: any) => () => {
  root.$store.dispatch(`main/${MainConstant.$Call.MainData}`)
}
