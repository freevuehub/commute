import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import { CommuteConstant } from '~/constant'
import { ICommuteItem } from '~/types'

interface IState {
  modal: boolean
  time: string
  type: string
}

interface IComputedCommuteItem extends ICommuteItem {
  date: string
  startTime: string
  endTime: string | null
}

interface IConputed {
  commuteItem: ComputedRef<IComputedCommuteItem>
}

const now = dayjs()

export const useState = () =>
  reactive<IState>({
    modal: false,
    time: now.format('HH:mm:00'),
    type: '',
  })

export const useComputed = ({ root }: SetupContext) =>
  reactive<IConputed>({
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

export const useSaveClick = (
  state: IState,
  compute: { commuteItem: IComputedCommuteItem },
  { root }: SetupContext
) => async () => {
  const dateValue = () => {
    switch (state.type) {
      case '출근':
        return {
          startDate: `${compute.commuteItem.date} ${state.time}`,
          endDate: compute.commuteItem.startDate,
        }
      case '퇴근':
        return {
          startDate: compute.commuteItem.startDate,
          endDate: `${compute.commuteItem.date} ${state.time}`,
        }
    }
  }

  await root.$store.dispatch(CommuteConstant.$Call.CommutePut, {
    companyId: null,
    comment: null,
    tags: null,
    ...dateValue(),
  })

  state.modal = false
}

export const useRowClick = (state: IState) => (type: string) => {
  state.type = type
  state.modal = true
}
