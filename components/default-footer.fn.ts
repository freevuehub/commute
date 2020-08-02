import { reactive } from '@vue/composition-api'
import dayjs from 'dayjs'

dayjs.locale('ko')

export const useState = () =>
  reactive({
    year: dayjs().year(),
  })
