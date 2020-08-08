// import dayjs from 'dayjs'
import { MainConstant } from '~/constant'
import { getMainData } from '~/API'
import { ICommuteItem } from '~/types'

interface IPayload {
  termAvg: number
  weekList: ICommuteItem[]
}

export interface IState {
  data: IPayload
}

export const state = () => ({
  data: {
    termAvg: 0,
    weekList: [],
  },
})

export const mutations = {
  [MainConstant.$Set.MainData](state: IState, payload: IPayload) {
    state.data = payload
  },
}

export const actions = {
  [MainConstant.$Call.MainData]: async (store: any) => {
    const { result } = await getMainData()

    store.commit(MainConstant.$Set.MainData, { ...result })
  },
}

export const getters = {
  [MainConstant.$Get.MainData](state: IState) {
    return state.data
  },
}
