import { reactive, computed, SetupContext } from '@vue/composition-api'
import { SnackConstant } from '~/constant'

export const useComputed = (context: SetupContext) =>
  reactive({
    status: computed(() => {
      return context.root.$store.getters[`snackBar/${SnackConstant.$Get.SnackStatus}`]
    }),
  })

export const useSnackBarClose = (context: SetupContext) => () => {
  context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, { view: false })
}

export const useSnackBarInput = (context: SetupContext) => (value: boolean) => {
  context.root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, { view: value })
}
