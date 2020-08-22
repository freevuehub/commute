// import dayjs from 'dayjs'
import { MainConstant, AuthConstant } from '~/constant'
import { getMainData } from '~/API'
import { IMainData } from '~/types'

export interface IState {
  data: IMainData
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
})

export const mutations = {
  [MainConstant.$Set.MainData](state: IState, payload: IMainData) {
    state.data = { ...state.data, ...payload }
  },
}

export const actions = {
  [MainConstant.$Call.MainData]: async (store: any) => {
    const { result } = await getMainData()

    store.commit(MainConstant.$Set.MainData, { ...result })
  },
}

export const getters = {
  [MainConstant.$Get.MainData](state: IState): IMainData {
    return state.data
  },
}
