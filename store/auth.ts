import { AuthConstant } from '~/constant'
import { postGitHubSignIn } from '~/API'

interface IProfile {
  avatarUrl: string
  email: string
  name: string
}
interface IState {
  authData: {
    idToken: string
    idpId: string
    loginHint: string
    tokenType: 'Bearer'
  }
  profile: IProfile
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
    avatarUrl: '',
    name: '',
  },
})

export const mutations = {
  [AuthConstant.$Set.Auth](state: IState, payload: IState) {
    state.authData = payload.authData
    state.profile = payload.profile
  },
  [AuthConstant.$Set.Profile](state: IState, payload: IProfile) {
    state.profile = payload
  },
}

export const actions = {
  [AuthConstant.$Call.Auth](store: any, payload: IState) {
    store.commit(AuthConstant.$Set.Auth, payload)
  },
  async [AuthConstant.$Call.GitHubSigin](store: any, payload: string) {
    const { result } = await postGitHubSignIn(payload)

    document.cookie = `token=${result.token};`

    store.commit(AuthConstant.$Set.Profile, result.profile)
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
