import { CommuteConstant } from '~/constant'
import { postCommute, putCommute, getCommuteList, getCommuteItem } from '~/API'
import {
  ICommuteDetailResponse,
  ICommuteListItem,
  ICommuteItemOfAPI,
  ICommuteOfPutAPI,
} from '~/types'

interface IState {
  commuteItem: ICommuteDetailResponse
  commuteList: ICommuteListItem[]
  listTotal: number
}

export const state = (): IState => ({
  commuteItem: {
    totalWorkTime: 0,
    id: 0,
    endDate: null,
    startDate: null,
    comment: null,
    tags: null,
    company: {
      industryName: '',
      ceoName: '',
      companyAddress: '',
      companyLat: null,
      companyLong: null,
      companyName: '',
      companyZipCode: 0,
      contact: '',
      establishmenDate: '',
      size: '',
    },
  },
  commuteList: [],
  listTotal: 0,
})

export const mutations = {
  [CommuteConstant.$Set.CommuteList]: (state: IState, payload: ICommuteListItem[]) => {
    state.commuteList = payload
  },
  [CommuteConstant.$Set.CommuteItem]: (state: IState, payload: ICommuteDetailResponse) => {
    state.commuteItem = payload
  },
  [CommuteConstant.$Set.CommuteListTotal]: (state: IState, payload: number) => {
    state.listTotal = payload
  },
}

export const actions = {
  [CommuteConstant.$Call.CommutePost]: async (_: any, model: ICommuteItemOfAPI) => {
    await postCommute(model)
  },
  [CommuteConstant.$Call.CommutePut]: async (
    store: any,
    { id, payload }: ICommuteOfPutAPI<ICommuteItemOfAPI>
  ) => {
    await putCommute(id, payload)

    const { result } = await getCommuteItem(id)

    store.commit(CommuteConstant.$Set.CommuteItem, result)
  },
  [CommuteConstant.$Call.CommuteGetList]: async (
    store: any,
    { page, limit }: { page: number; limit: number }
  ) => {
    const { result, totalCount } = await getCommuteList(page, limit)

    store.commit(CommuteConstant.$Set.CommuteList, result)
    store.commit(CommuteConstant.$Set.CommuteListTotal, totalCount)
  },
  [CommuteConstant.$Call.CommuteGetItem]: (store: any, payload: ICommuteDetailResponse) => {
    store.commit(CommuteConstant.$Set.CommuteItem, payload)
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
