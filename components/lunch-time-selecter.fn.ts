import { reactive, computed, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { AuthConstant } from '~/constant'

interface IProps {
  start: string
  end: string
}

interface IState {
  window: string
  start: string
  end: string
}

export const useState = (props: IProps) =>
  reactive<IState>({
    window: 'startTime',
    start: props.start || dayjs().format('HH:mm'),
    end: props.end || dayjs().format('HH:mm'),
  })

export const useComputed = (state: IState) =>
  reactive({
    title: computed(() => {
      switch (state.window) {
        case 'startTime':
          return '점심 시작 시간'
        case 'endTime':
          return '점심 종료 시간'
        default:
          return ''
      }
    }),
  })

export const useStartWatch = (context: SetupContext) => async (lunchStartTime: string) => {
  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, { lunchStartTime })
}

export const useEndWatch = (context: SetupContext) => async (lunchEndTime: string) => {
  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, { lunchEndTime })
}
