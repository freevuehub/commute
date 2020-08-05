import { CommuteConstant } from '~/constant'
import { postCommute, putCommute, getCommuteList, getCommuteItem } from '~/API'
import { ICommuteItem, ICommutePostOrPutItem } from '~/types'

interface IState {
  commuteItem: ICommuteItem
  commuteList: ICommuteItem[]
  listTotal: number
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
  listTotal: 0,
})

export const mutations = {
  [CommuteConstant.$Set.CommuteList]: (state: IState, payload: ICommuteItem[]) => {
    state.commuteList = payload
  },
  [CommuteConstant.$Set.CommuteItem]: (state: IState, payload: ICommuteItem) => {
    state.commuteItem = payload
  },
  [CommuteConstant.$Set.CommuteListTotal]: (state: IState, payload: number) => {
    state.listTotal = payload
  },
}

export const actions = {
  [CommuteConstant.$Call.CommutePost]: async (_: any, model: ICommutePostOrPutItem) => {
    await postCommute(model)
  },
  [CommuteConstant.$Call.CommutePut]: async (store: any, model: ICommutePostOrPutItem) => {
    await putCommute(store.state.commuteItem.id, model)
  },
  [CommuteConstant.$Call.CommuteGetList]: async (
    store: any,
    { page, limit }: { page: number; limit: number }
  ) => {
    store.commit(CommuteConstant.$Set.CommuteList, [])
    store.commit(CommuteConstant.$Set.CommuteListTotal, 0)

    const { result, totalCount } = await getCommuteList(page, limit)

    setTimeout(() => {
      store.commit(CommuteConstant.$Set.CommuteList, result)
      store.commit(CommuteConstant.$Set.CommuteListTotal, totalCount)
    }, 300)
  },
  [CommuteConstant.$Call.CommuteGetItem]: async (store: any, id: number) => {
    const { result } = await getCommuteItem(id)

    store.commit(CommuteConstant.$Set.CommuteItem, result)
  },
}

export const getters = {
  [CommuteConstant.$Get.CommuteItem](state: IState) {
    return state.commuteItem
  },
  [CommuteConstant.$Get.CommuteList](state: IState) {
    return state.commuteList
  },
  [CommuteConstant.$Get.CommuteListTotal](state: IState) {
    return state.listTotal
  },
}
