import { SetupContext, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import { MainConstant } from '~/constant'

const floor = (value: number): number => Math.floor(value)

export const useComputed = (context: SetupContext) => ({
  today: computed(() => {
    const today = context.root.$store.getters[`main/${MainConstant.$Get.TodayData}`]
    const nowDiffStart = today.startDate ? dayjs().diff(today.startDate, 'minute') : 0
    const breakTime = floor(Number(nowDiffStart) / 240) * 30

    return {
      totalWorkTime: today.totalWorkTime
        ? `${floor(today.totalWorkTime / 60)}시간 ${today.totalWorkTime % 60}분`
        : `${floor((nowDiffStart - breakTime) / 60)}시간 ${(nowDiffStart - breakTime) % 60}분`,
      startDate: today.startDate && dayjs(today.startDate).format('HH:mm'),
      endDate: today.endDate && dayjs(today.endDate).format('HH:mm'),
    }
  }),
})
