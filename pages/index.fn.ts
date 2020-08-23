import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import { ICommuteItem } from '~/types'
import { MainConstant, SnackConstant, CommuteConstant } from '~/constant'

export interface IState {
  mainData: any
}

export interface IComputed {
  weekBarValue: ComputedRef<number[]>
  weekBarLabels: ComputedRef<string[]>
}

export const useState = ({ root }: SetupContext) =>
  reactive<IState>({
    mainData: computed(() => {
      const data = root.$store.getters[`main/${MainConstant.$Get.MainData}`]
      const nowDiffStart = data.todayData.startDate
        ? dayjs().diff(data.todayData.startDate, 'minute')
        : 0
      const breakTime = Math.floor(Number(nowDiffStart) / 240) * 30
      const weekOverTime = data.weekTermSum - data.weekCount * 8 * 60
      const monthOverTime = data.monthTermSum - data.monthCount * 8 * 60

      return {
        ...data,
        todayData: {
          ...data.todayData,
          totalWorkTime: data.todayData.totalWorkTime
            ? `${Math.floor(data.todayData.totalWorkTime / 60)}시간 ${
                data.todayData.totalWorkTime % 60
              }분`
            : `${Math.floor((nowDiffStart - breakTime) / 60)}시간 ${
                (nowDiffStart - breakTime) % 60
              }분`,
          startDate: data.todayData.startDate && dayjs(data.todayData.startDate).format('HH:mm'),
          endDate: data.todayData.endDate && dayjs(data.todayData.endDate).format('HH:mm'),
        },
        weekTermAvg: `${Math.floor(data.weekTermAvg / 60)}시간 ${data.weekTermAvg % 60}분`,
        weekTermSum: `${Math.floor(data.weekTermSum / 60)}시간 ${data.weekTermSum % 60}분`,
        monthTermAvg: `${Math.floor(data.monthTermAvg / 60)}시간 ${data.monthTermAvg % 60}분`,
        monthTermSum: `${Math.floor(data.monthTermSum / 60)}시간 ${data.monthTermSum % 60}분`,
        weekOverTime: `${Math.floor(weekOverTime / 60)}시간 ${weekOverTime % 60}분`,
        monthOverTime: `${Math.floor(monthOverTime / 60)}시간 ${monthOverTime % 60}분`,
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

export const useCommuteTimeSave = ({ root }: SetupContext, state: IState) => async (
  key: string
) => {
  const now = dayjs()
  const time = now.format('HH:mm:00')
  const date = now.format('YYYY-MM-DD')
  const {
    mainData: { todayData },
  } = state

  switch (key) {
    case '출근':
      await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePost}`, {
        companyId: 1,
        startDate: `${date} ${time}`,
        endDate: null,
        comment: null,
        tags: null,
      })

      break
    case '퇴근':
      await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
        id: todayData.id,
        payload: {
          endDate: `${date} ${time}`,
        },
      })

      break
  }

  root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, {
    message: `${time}에 ${key}하셨습니다.`,
    view: true,
    type: 'success',
  })

  useeMounted(root)()
}

export const useeMounted = (root: any) => () => {
  console.log('main mounted')
  root.$store.dispatch(`main/${MainConstant.$Call.MainData}`)
}
