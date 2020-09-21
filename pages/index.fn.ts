import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import { ICommuteItem, IUserProfile } from '~/types'
import { MainConstant, SnackConstant, CommuteConstant, AuthConstant } from '~/constant'

export interface IState {
  mainData: any
}

export interface IComputed {
  weekBarValue: ComputedRef<number[]>
  weekBarLabels: ComputedRef<string[]>
  userProfile: ComputedRef<IUserProfile>
}

const floor = (value: number): number => Math.floor(value)

export const useState = ({ root }: SetupContext) =>
  reactive<IState>({
    mainData: computed(() => {
      const data = root.$store.getters[`main/${MainConstant.$Get.MainData}`]
      const nowDiffStart = data.todayData.startDate
        ? dayjs().diff(data.todayData.startDate, 'minute')
        : 0
      const breakTime = floor(Number(nowDiffStart) / 240) * 30
      const weekOverTime = data.weekTermSum - data.weekCount * 8 * 60
      const monthOverTime = data.monthTermSum - data.monthCount * 8 * 60

      return {
        ...data,
        todayData: {
          ...data.todayData,
          totalWorkTime: data.todayData.totalWorkTime
            ? `${floor(data.todayData.totalWorkTime / 60)}시간 ${
                data.todayData.totalWorkTime % 60
              }분`
            : `${floor((nowDiffStart - breakTime) / 60)}시간 ${(nowDiffStart - breakTime) % 60}분`,
          startDate: data.todayData.startDate && dayjs(data.todayData.startDate).format('HH:mm'),
          endDate: data.todayData.endDate && dayjs(data.todayData.endDate).format('HH:mm'),
        },
        weekTermAvg: `${floor(data.weekTermAvg / 60)}시간 ${data.weekTermAvg % 60}분`,
        weekTermSum: `${floor(data.weekTermSum / 60)}시간 ${data.weekTermSum % 60}분`,
        monthTermAvg: `${floor(data.monthTermAvg / 60)}시간 ${data.monthTermAvg % 60}분`,
        monthTermSum: `${floor(data.monthTermSum / 60)}시간 ${data.monthTermSum % 60}분`,
        weekOverTime:
          weekOverTime < 0
            ? `-${floor(Math.abs(weekOverTime) / 60)}시간 ${Math.abs(weekOverTime) % 60}분`
            : `${floor(weekOverTime / 60)}시간 ${weekOverTime % 60}분`,
        monthOverTime:
          monthOverTime < 0
            ? `-${floor(Math.abs(monthOverTime) / 60)}시간 ${Math.abs(monthOverTime) % 60}분`
            : `${floor(monthOverTime / 60)}시간 ${monthOverTime % 60}분`,
      }
    }),
  })

export const useComputed = (context: SetupContext, state: IState) =>
  reactive<IComputed>({
    weekBarValue: computed(() => {
      const { weekList } = state.mainData

      return weekList.map((item: ICommuteItem | null) => (item ? item.totalWorkTime : 0))
    }),
    weekBarLabels: computed(() => {
      const weekNameList = ['일', '월', '화', '수', '목', '금', '토']

      return weekNameList.map((_: string, index: number) => `${dayjs().day(index).format('DD')}일`)
    }),
    userProfile: computed(() => {
      return context.root.$store.getters[`auth/${AuthConstant.$Get.Profile}`]
    }),
  })

export const useCommuteTimeSave = (context: SetupContext, state: IState) => async (key: string) => {
  try {
    const now = dayjs()
    const time = now.format('HH:mm:00')
    const date = now.format('YYYY-MM-DD')
    const {
      mainData: { todayData },
    } = state
    const { companyId } = context.root.$store.getters[`auth/${AuthConstant.$Get.Profile}`]

    switch (key) {
      case '출근':
        await context.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePost}`, {
          companyId,
          startDate: `${date} ${time}`,
          endDate: null,
          comment: null,
          tags: null,
        })

        break
      case '퇴근':
        await context.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
          id: todayData.id,
          payload: {
            endDate: `${date} ${time}`,
          },
        })

        break
    }

    context.root.$store.dispatch(
      `snackBar/${SnackConstant.$Call.Success}`,
      `${time}에 ${key}하셨습니다.`
    )
  } catch {
    context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Error}`, '에러가 발생했습니다.')
  }
}
