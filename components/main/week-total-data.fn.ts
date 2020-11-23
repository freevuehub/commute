import { computed, reactive } from '@vue/composition-api'
import dayjs from 'dayjs'

export const useComputed = (props: any) =>
  reactive({
    weekBarValue: computed(() => {
      const { weekList } = props.item

      return weekList.map((item: any | null) => (item ? item.totalWorkTime : 0))
    }),
    weekBarLabels: computed(() => {
      const weekNameList = ['일', '월', '화', '수', '목', '금', '토']

      return weekNameList.map((_: string, index: number) => `${dayjs().day(index).format('DD')}일`)
    }),
  })
