import { MainConstant } from '~/constant'
import { IMainData, IMainTodayData, IMainWeekData, IMainMonthData } from '~/types'

export interface IState {
  data: IMainData
  today: IMainTodayData
  week: IMainWeekData
  month: IMainMonthData
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
  week: {
    weekTermSum: 0,
    weekTermAvg: 0,
    weekCount: 0,
    weekList: [],
  },
  month: {
    monthTermSum: 0,
    monthTermAvg: 0,
    monthCount: 0,
  },
})

export const mutations = {
  [MainConstant.$Set.MainData](store: IState, payload: IMainData) {
    store.data = { ...store.data, ...payload }
  },
  [MainConstant.$Set.TodayData](store: IState, payload: IMainTodayData) {
    store.today = payload
  },
  [MainConstant.$Set.WeekData](store: IState, payload: IMainWeekData) {
    store.week = payload
  },
  [MainConstant.$Set.MonthData](store: IState, payload: IMainMonthData) {
    store.month = payload
  },
}

export const actions = {
  [MainConstant.$Call.MainData]: (store: any, payload: any) => {
    store.commit(MainConstant.$Set.MainData, payload)
  },
  [MainConstant.$Call.TodayData]: (store: any, payload: IMainTodayData) => {
    store.commit(MainConstant.$Set.TodayData, payload)
  },
  [MainConstant.$Call.WeekData]: (store: any, payload: IMainWeekData) => {
    store.commit(MainConstant.$Set.WeekData, payload)
  },
  [MainConstant.$Call.MonthData]: (store: any, payload: IMainMonthData) => {
    store.commit(MainConstant.$Set.MonthData, payload)
  },
}

export const getters = {
  [MainConstant.$Get.MainData](store: IState): IMainData {
    return store.data
  },
  [MainConstant.$Get.TodayData](store: IState): IMainTodayData {
    return store.today
  },
  [MainConstant.$Get.WeekData](store: IState): IMainWeekData {
    return store.week
  },
  [MainConstant.$Get.MonthData](store: IState): IMainMonthData {
    return store.month
  },
}
