import { reactive, computed, ComputedRef } from '@vue/composition-api'
import dayjs from 'dayjs'
import { ICommuteItem } from '~/types'
import { MainConstant, SnackConstant, CommuteConstant } from '~/constant'

export interface IState {
  time: string
  date: string
}

export interface IComputed {
  mainData: ComputedRef<ICommuteItem>
}

const now = dayjs()

export const useState = () =>
  reactive<IState>({
    time: now.format('HH:mm:00'),
    date: now.format('YYYY-MM-DD'),
  })

export const useComputed = (root: any) =>
  reactive<IComputed>({
    mainData: computed(() => {
      return root.$store.getters[`main/${MainConstant.$Get.MainData}`]
    }),
  })

export const useStartTimeSave = (root: any, state: IState) => async () => {
  await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePost}`, {
    companyId: 1,
    startDate: `${state.date} ${state.time}`,
    endDate: null,
    comment: null,
    tags: null,
  })

  root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, {
    message: '출근시간이 등록되었습니다.',
    view: true,
    type: 'success',
  })
}

export const useEndTimeSave = (root: any, state: IState) => async () => {
  await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommutePut}`, {
    endDate: `${state.date} ${state.time}`,
  })

  root.$store.dispatch(`snackBar/${SnackConstant.$Call.SnackStatus}`, {
    message: '퇴근시간이 등록되었습니다.',
    view: true,
    type: 'success',
  })
}
