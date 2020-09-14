import { reactive, computed, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'

dayjs.locale('ko')

export const useState = () =>
  reactive({
    year: dayjs().year(),
  })

export const useComputed = (context: SetupContext) =>
  reactive({
    breakPoint: computed(() => {
      const { $vuetify }: any = context.root

      console.log($vuetify.breakpoint)

      return $vuetify.breakpoint
    }),
  })
