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
  memoEdit: boolean
}

interface IComputedCommuteItem extends ICommuteItem {
  date: string
  startTime: string
  endTime: string | null
  workTime: string
}

interface IConputed {
  item: ComputedRef<IComputedCommuteItem>
}

const now = dayjs()

export const useState = () =>
  reactive<IState>({
    modal: false,
    loading: false,
    memoEdit: false,
    time: now.format('HH:mm:00'),
    type: '',
  })

export const useComputed = ({ root }: SetupContext) =>
  reactive<IConputed>({
    item: computed(() => {
      const detailItem: ICommuteItem =
        root.$store.getters[`commute/${CommuteConstant.$Get.CommuteItem}`]

      return {
        ...detailItem,
        date: dayjs(detailItem.startDate).format('YYYY-MM-DD'),
        startTime: dayjs(detailItem.startDate).format('HH:mm'),
        endTime: detailItem.endDate ? dayjs(detailItem.endDate).format('HH:mm') : 'N/A',
        workTime: detailItem.totalWorkTime
          ? `${Math.floor(detailItem.totalWorkTime / 60)}시간 ${detailItem.totalWorkTime % 60}분`
          : 'N/A',
      }
    }),
  })

export const useSaveClick = (
  state: IState,
  compute: { item: IComputedCommuteItem },
  vm: SetupContext
) => async () => {
  try {
    const dateValue = () => {
      switch (state.type) {
        case '출근':
          return {
            startDate: `${compute.item.date} ${state.time}`,
          }
        case '퇴근':
          return {
            endDate: `${compute.item.date} ${state.time}`,
          }
      }
    }

    state.loading = true

    await vm.root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
      id: vm.root.$route.params.id,
      payload: {
        ...dateValue(),
      },
    })

    state.modal = false
    state.loading = false

    vm.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Success}`, '등록되었습니다.')
  } catch {
    vm.root.$store.dispatch(`snackBar/${SnackConstant.$Call.Error}`, '에러가 발생했습니다.')
  }
}

export const useRowClick = (state: IState, compute: { item: IComputedCommuteItem }) => (
  type: string
) => {
  state.type = type
  state.modal = true
  state.time =
    type === '출근'
      ? dayjs(compute.item.startDate).format('HH:mm')
      : compute.item.endDate
      ? dayjs(compute.item.endDate).format('HH:mm')
      : now.format('HH:mm:00')
}
