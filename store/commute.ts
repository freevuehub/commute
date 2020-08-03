import { CommuteConstant } from '~/constant'
import { postCommute, putCommute, getCommuteList } from '~/API'
import { ICommuteItem, ICommutePostOrPutItem } from '~/types'

interface IState {
  commuteItem: ICommuteItem
  commuteList: ICommuteItem[]
}

export const state = () => ({
  commuteItem: {
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
  commuteList: [],
})

export const mutations = {
  [CommuteConstant.$Set.CommuteList]: (state: IState, payload: ICommuteItem[]) => {
    state.commuteList = payload
  },
  [CommuteConstant.$Set.CommuteItem]: (state: IState, payload: ICommuteItem) => {
    state.commuteItem = payload
  },
}

export const actions = {
  [CommuteConstant.$Call.CommutePost]: async (_: any, model: ICommutePostOrPutItem) => {
    await postCommute(model)
  },
  [CommuteConstant.$Call.CommutePut]: async (store: any, model: ICommutePostOrPutItem) => {
    await putCommute(store.state.commuteItem.commuteId, model)
  },
  [CommuteConstant.$Call.CommuteGetList]: async (
    store: any,
    { page, limit }: { page: number; limit: number }
  ) => {
    const { result } = await getCommuteList(page, limit)

    store.commit(CommuteConstant.$Set.CommuteList, result)
  },
}

export const getters = {
  [CommuteConstant.$Get.CommuteList](state: IState) {
    return state.commuteList
  },
}
