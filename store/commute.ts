import { CommuteConstant } from '~/constant'
import { postCommute, putCommute } from '~/API'
import { ICommuteItem, ICommutePostOrPutItem } from '~/types'

interface IState {
  commuteItem: ICommuteItem
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
})

export const mutations = {
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
}

export const getters = {}
