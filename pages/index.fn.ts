import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import { ICommuteItem, IUserProfile } from '~/types'
import { MainConstant, AuthConstant } from '~/constant'

export interface IState {
  bottomModalStataue: boolean
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
    bottomModalStataue: false,
    mainData: computed(() => {
      const data = root.$store.getters[`main/${MainConstant.$Get.MainData}`]
      const monthOverTime = data.monthTermSum - data.monthCount * 8 * 60

      return {
        ...data,
        monthTermAvg: `${floor(data.monthTermAvg / 60)}시간 ${data.monthTermAvg % 60}분`,
        monthTermSum: `${floor(data.monthTermSum / 60)}시간 ${data.monthTermSum % 60}분`,
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

export const useSheetClose = (state: IState) => () => {
  state.bottomModalStataue = false
}
