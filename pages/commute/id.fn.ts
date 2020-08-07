import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { CommuteConstant, SnackConstant } from '~/constant'
import { ICommuteItem } from '~/types'

interface IState {
  modal: boolean
  loading: boolean
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
    loading: true,
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

export const useBeforeMounted = (state: IState, { root }: SetupContext) => async () => {
  try {
    await root.$store.dispatch(
      `commute/${CommuteConstant.$Call.CommuteGetItem}`,
      Number(root.$route.params.id)
    )

    setTimeout(() => {
      state.loading = false
    }, 300)
  } catch (err) {
    console.error(err)

    state.loading = false
  }
}

export const useSaveClick = (
  state: IState,
  compute: { commuteItem: IComputedCommuteItem },
  vm: SetupContext
) => async () => {
  const dateValue = () => {
    switch (state.type) {
      case '출근':
        return {
          startDate: `${compute.commuteItem.date} ${state.time}`,
        }
      case '퇴근':
        return {
          endDate: `${compute.commuteItem.date} ${state.time}`,
        }
    }
  }

  await vm.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
    ...dateValue(),
  })

  state.modal = false
  state.loading = true

  await useBeforeMounted(state, vm)()

  vm.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '등록되었습니다.')
}

export const useRowClick = (state: IState, compute: { commuteItem: IComputedCommuteItem }) => (
  type: string
) => {
  state.type = type
  state.modal = true
  state.time =
    type === '출근'
      ? dayjs(compute.commuteItem.startDate).format('HH:mm')
      : compute.commuteItem.endDate
      ? dayjs(compute.commuteItem.endDate).format('HH:mm')
      : now.format('HH:mm:00')
}
