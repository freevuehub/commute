import dayjs from 'dayjs'
import { MainConstant, CommuteConstant } from '~/constant'
import { getMainData } from '~/API'
import { ICommuteItem } from '~/types'

export interface IState {
  data: ICommuteItem
}

export const state = () => ({
  data: {
    companyId: null,
    companyName: '',
    companyAddress: '',
    companyZipCode: null,
    latitude: null,
    longitude: null,
    commuteId: null,
    endDate: null,
    startDate: null,
    comment: null,
    tags: null,
  },
})

export const mutations = {
  [MainConstant.$Set.MainData](state: IState, payload: ICommuteItem) {
    state.data = payload
  },
}

export const actions = {
  [MainConstant.$Call.MainData]: async (store: any) => {
    const { result } = await getMainData()

    console.log(store)

    store.commit(MainConstant.$Set.MainData, {
      ...result,
      startDate: result.startDate && dayjs(result.startDate).format('YYYY-MM-DD'),
      endDate: result.endDate && dayjs(result.endDate).format('YYYY-MM-DD'),
    })
    store.commit(`commute/${CommuteConstant.$Set.CommuteItem}`, {
      ...result,
      startDate: result.startDate && dayjs(result.startDate).format('YYYY-MM-DD'),
      endDate: result.endDate && dayjs(result.endDate).format('YYYY-MM-DD'),
    })
  },
}

export const getters = {
  [MainConstant.$Get.MainData](state: IState) {
    return state.data
  },
}