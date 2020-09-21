import { reactive, computed } from '@vue/composition-api'
import dayjs from 'dayjs'

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

export const useStartWatch = (value: string) => {
  console.log(value)
}

export const useEndWatch = (value: string) => {
  console.log(value)
}
