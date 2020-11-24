import { computed, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { MainConstant } from '~/constant'

const floor = (value: number): number => Math.floor(value)

export const useComputed = (context: SetupContext) => ({
  week: computed(() => {
    const week = context.root.$store.getters[`main/${MainConstant.$Get.WeekData}`]
    const weekOverTime = week.weekTermSum - week.weekCount * 8 * 60

    return {
      ...week,
      weekTermAvg: `${floor(week.weekTermAvg / 60)}시간 ${week.weekTermAvg % 60}분`,
      weekTermSum: `${floor(week.weekTermSum / 60)}시간 ${week.weekTermSum % 60}분`,
      weekOverTime:
        weekOverTime < 0
          ? `-${floor(Math.abs(weekOverTime) / 60)}시간 ${Math.abs(weekOverTime) % 60}분`
          : `${floor(weekOverTime / 60)}시간 ${weekOverTime % 60}분`,
      weekList: week.weekList.map((item: any | null) => (item ? item.totalWorkTime : 0)),
    }
  }),
  weekBarLabels: computed(() => {
    const weekNameList = ['일', '월', '화', '수', '목', '금', '토']

    return weekNameList.map((_: string, index: number) => `${dayjs().day(index).format('DD')}일`)
  }),
})
