import { reactive, computed, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import { CommuteConstant } from '~/constant'
import { ICommuteItem } from '~/types'

export const useState = () =>
  reactive({
    modal: false,
  })

export const useComputed = ({ root }: SetupContext) =>
  reactive({
    commuteItem: computed(() => {
      const detailItem: ICommuteItem =
        root.$store.getters[`commute/${CommuteConstant.$Get.CommuteItem}`]

      return {
        ...detailItem,
        date: dayjs(detailItem.startDate).format('YYYY-MM-DD'),
        startTime: dayjs(detailItem.startDate).format('HH:mm'),
        endTime: detailItem.endDate ? dayjs(detailItem.endDate).format('HH:mm') : 'N/A',
      }
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
