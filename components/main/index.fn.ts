import { SetupContext } from '@vue/composition-api'

export const useCardThemeEditing = (context: SetupContext) => (payload: boolean) => {
  context.emit('editing', payload)
}
