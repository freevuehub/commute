import { SnackConstant } from '~/constant'

export interface IPayload {
  message?: string
  timeout?: number
  view?: boolean
  type?: string
}

export interface IState {
  status: IPayload
}

export const state = () => ({
  status: {
    message: '',
    timeout: 3000,
    view: false,
    type: 'info',
  },
})

export const mutations = {
  [SnackConstant.$Set.SnackStatus]: (state: IState, payload: IPayload) => {
    state.status = {
      ...state.status,
      ...payload,
    }
  },
}

export const actions = {
  [SnackConstant.$Call.SnackStatus]: ({ commit }: any, model: IPayload) => {
    commit(SnackConstant.$Set.SnackStatus, { ...model })
  },
  [SnackConstant.$Call.Success]: ({ commit }: any, message: string) => {
    commit(SnackConstant.$Set.SnackStatus, {
      message,
      timeout: 3000,
      view: true,
      type: 'success',
    })
  },
}

export const getters = {
  [SnackConstant.$Get.SnackStatus](state: IState) {
    return state.status
  },
}
