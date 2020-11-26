import { reactive, SetupContext } from '@vue/composition-api'

interface IState {
  timeout: ReturnType<typeof setTimeout> | null
}

export const useState = () =>
  reactive<IState>({
    timeout: null,
  })

export const useCardTouchStart = (context: SetupContext, state: IState) => () => {
  const useTimeOut = () => {
    context.emit('editing', true)
  }

  state.timeout = setTimeout(useTimeOut, 2000)
}

export const useCardTouchEnd = (state: IState) => () => {
  if (state.timeout !== null) {
    clearTimeout(state.timeout)
  }
}
