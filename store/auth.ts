import { AuthConstant } from '~/constant'
import instance from '~/API/instance'

interface IState {
  authData: {
    idToken: string
    idpId: string
    loginHint: string
    tokenType: 'Bearer'
  }
  profile: {
    email: string
    id: string
    imageUrl: string
    name: string
  }
}

export const state = (): IState => ({
  authData: {
    idToken: '',
    idpId: '',
    loginHint: '',
    tokenType: 'Bearer',
  },
  profile: {
    email: '',
    id: '',
    imageUrl: '',
    name: '',
  },
})

export const mutations = {
  [AuthConstant.$Set.Auth](state: IState, payload: IState) {
    state.authData = payload.authData
    state.profile = payload.profile
  },
}

export const actions = {
  [AuthConstant.$Call.Auth](store: any, payload: IState) {
    console.log(instance)
    instance.interceptors.response.use((config) => {
      console.log(config)

      return config
    })
    // axios.defaults.headers.common = {
    //   Authorization: `${payload.authData.tokenType} ${payload.authData.idToken}`,
    // }

    store.commit(AuthConstant.$Set.Auth, payload)
  },
}

export const getters = {
  [AuthConstant.$Get.Token](state: IState) {
    return state.authData
  },
  [AuthConstant.$Get.Profile](state: IState) {
    return state.profile
  },
}
