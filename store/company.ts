import { CompanyConstant } from '~/constant'
import { ICompanyListItemResponse } from '~/types'
import { getCompanyList } from '~/API'

interface IState {
  list: ICompanyListItemResponse[] | []
}

export const state = (): IState => ({
  list: [],
})

export const mutations = {
  [CompanyConstant.$Set.List](state: IState, payload: ICompanyListItemResponse[] | []) {
    state.list = payload
  },
}

export const actions = {
  async [CompanyConstant.$Call.List](store: any, payload: string) {
    const { result } = await getCompanyList(payload)

    store.commit(CompanyConstant.$Set.List, result)
  },
  [CompanyConstant.$Call.ListReset](store: any) {
    store.commit(CompanyConstant.$Set.List, [])
  },
}

export const getters = {
  [CompanyConstant.$Get.List](state: IState) {
    return state.list
  },
}
