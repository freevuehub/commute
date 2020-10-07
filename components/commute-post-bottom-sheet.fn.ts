import { SetupContext, reactive } from '@vue/composition-api'
import dayjs from 'dayjs'

interface IState {
  time: string
}

const updateNowTime = (state: IState) => () => {
  state.time = dayjs().format('HH시 mm분 ss초')
}

export const useState = () =>
  reactive({
    time: dayjs().format('HH시 mm분 ss초'),
  })

export const useCommuteBtnClick = (context: SetupContext) => (key: string) => {
  context.emit('click', key)
}

export const useBeforeMount = (state: IState) => () => {
  setInterval(updateNowTime(state), 1000)
}
