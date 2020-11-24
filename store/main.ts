import { MainConstant } from '~/constant'
import { IMainData } from '~/types'

interface IToday {
  id: string
  companyName: string
  totalWorkTime: number
  startDate: string
  endDate: string | null
}
export interface IState {
  data: IMainData
  today: IToday
}

export const state = () => ({
  data: {
    termAvg: 0,
    weekTermSum: 0,
    weekCount: 0,
    monthCount: 0,
    weekList: [],
    todayData: {
      id: 0,
      companyName: '',
      companyAddress: '',
      companyZipCode: null,
      latitude: null,
      longitude: null,
      totalWorkTime: 0,
      companyId: 0,
      startDate: '',
      endDate: null,
      comment: null,
      tags: null,
    },
  },
  today: {
    id: '',
    companyName: '',
    totalWorkTime: 0,
    startDate: '',
    endDate: null,
  },
})

export const mutations = {
  [MainConstant.$Set.MainData](state: IState, payload: IMainData) {
    state.data = { ...state.data, ...payload }
  },
  [MainConstant.$Set.TodayData](state: IState, payload: IToday) {
    state.today = payload
  },
}

export const actions = {
  [MainConstant.$Call.MainData]: (store: any, payload: any) => {
    store.commit(MainConstant.$Set.MainData, payload)
  },
  [MainConstant.$Call.TodayData]: (store: any, payload: any) => {
    store.commit(MainConstant.$Set.TodayData, payload)
  },
}

export const getters = {
  [MainConstant.$Get.MainData](state: IState): IMainData {
    return state.data
  },
  [MainConstant.$Get.TodayData](state: IState): IToday {
    return state.today
  },
}
