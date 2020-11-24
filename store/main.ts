import { MainConstant } from '~/constant'
import { IMainData, IMainWeekData } from '~/types'

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
  week: IMainWeekData
}

export const state = () => ({
  data: {
    termAvg: 0,
    weekTermSum: 0,
    weekCount: 0,
    monthCount: 0,
    weekList: [],
  },
  today: {
    id: '',
    companyName: '',
    totalWorkTime: 0,
    startDate: '',
    endDate: null,
  },
  week: {
    weekTermSum: 0,
    weekTermAvg: 0,
    weekCount: 0,
    weekList: [],
  },
})

export const mutations = {
  [MainConstant.$Set.MainData](store: IState, payload: IMainData) {
    store.data = { ...store.data, ...payload }
  },
  [MainConstant.$Set.TodayData](store: IState, payload: IToday) {
    store.today = payload
  },
  [MainConstant.$Set.WeekData](store: IState, payload: IMainWeekData) {
    store.week = payload
  },
}

export const actions = {
  [MainConstant.$Call.MainData]: (store: any, payload: any) => {
    store.commit(MainConstant.$Set.MainData, payload)
  },
  [MainConstant.$Call.TodayData]: (store: any, payload: IToday) => {
    store.commit(MainConstant.$Set.TodayData, payload)
  },
  [MainConstant.$Call.WeekData]: (store: any, payload: IMainWeekData) => {
    store.commit(MainConstant.$Set.WeekData, payload)
  },
}

export const getters = {
  [MainConstant.$Get.MainData](store: IState): IMainData {
    return store.data
  },
  [MainConstant.$Get.TodayData](store: IState): IToday {
    return store.today
  },
  [MainConstant.$Get.WeekData](store: IState): IMainWeekData {
    return store.week
  },
}
