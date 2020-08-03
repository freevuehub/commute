import { reactive, computed, SetupContext } from '@vue/composition-api'
import { CommuteConstant } from '~/constant'

export const useComputed = ({ root }: SetupContext) =>
  reactive({
    commuteItem: computed(() => {
      return root.$store.getters[`commute/${CommuteConstant.$Get.CommuteItem}`]
    }),
  })

export const useBeforeMounted = ({ root }: SetupContext) => async () => {
  try {
    await root.$store.dispatch(
      `commute/${CommuteConstant.$Call.CommuteGetItem}`,
      Number(root.$route.params.id)
    )
  } catch (err) {
    console.error(err)
  }
}
