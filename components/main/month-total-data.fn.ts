import { SetupContext, computed } from '@vue/composition-api'
import { MainConstant } from '~/constant'

const floor = (value: number): number => Math.floor(value)

export const useComputed = (context: SetupContext) => ({
  month: computed(() => {
    const month = context.root.$store.getters[`main/${MainConstant.$Get.MonthData}`]
    const monthOverTime = month.monthTermSum - month.monthCount * 8 * 60

    return {
      monthTermAvg: `${floor(month.monthTermAvg / 60)}시간 ${month.monthTermAvg % 60}분`,
      monthTermSum: `${floor(month.monthTermSum / 60)}시간 ${month.monthTermSum % 60}분`,
      monthOverTime:
        monthOverTime < 0
          ? `-${floor(Math.abs(monthOverTime) / 60)}시간 ${Math.abs(monthOverTime) % 60}분`
          : `${floor(monthOverTime / 60)}시간 ${monthOverTime % 60}분`,
    }
  }),
})
