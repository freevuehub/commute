import { reactive, computed } from '@vue/composition-api'
import { SnackConstant } from '~/constant'

export const useComputed = (root: any) =>
  reactive({
    status: computed(() => {
      return root.$store.getters[`snackBar/${SnackConstant.$Get.SnackStatus}`]
    }),
  })

export const useSnackBarClose = (root: any) => () => {
  root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, { view: false })
}
