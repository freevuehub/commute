import { SetupContext, reactive } from '@vue/composition-api'
import { AuthConstant } from '~/constant'

interface IState {
  switchLoading: boolean
}

export const useState = () =>
  reactive<IState>({
    switchLoading: false,
  })

export const useRowClick = (context: SetupContext) => (key: string) => {
  context.emit('click', key)
}

export const useSwitchChange = (context: SetupContext, state: IState) => async (value: boolean) => {
  state.switchLoading = !state.switchLoading

  await context.root.$store.dispatch(`auth/${AuthConstant.$Call.InfoPut}`, { isWork: value })

  state.switchLoading = !state.switchLoading
}
