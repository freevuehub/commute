import { AuthConstant } from '~/constant'
import { postGitHubSignIn, getUserProfile, getUserInfo } from '~/API'

interface IProfile {
  avatarUrl: string
  email: string
  name: string
}
interface IState {
  profile: IProfile
  userInfo: {}
}

export const state = (): IState => ({
  profile: {
    email: '',
    avatarUrl: '',
    name: '',
  },
  userInfo: {},
})

export const mutations = {
  [AuthConstant.$Set.Profile](state: IState, payload: IProfile) {
    state.profile = payload
  },
  [AuthConstant.$Set.Info](state: IState, payload: IProfile) {
    // state.profile = payload
    console.log(payload)
  },
}

export const actions = {
  async [AuthConstant.$Call.Info](store: any) {
    const { result } = await getUserInfo()

    store.commit(AuthConstant.$Set.Info, result.profile)
  },
  async [AuthConstant.$Call.Profile](store: any) {
    const { result } = await getUserProfile()

    store.commit(AuthConstant.$Set.Profile, result.profile)
  },
  async [AuthConstant.$Call.GitHubSigin](_: any, payload: string) {
    const { result } = await postGitHubSignIn(payload)

    document.cookie = `token=${result.token};`
  },
}

export const getters = {
  [AuthConstant.$Get.Profile](state: IState) {
    return state.profile
  },
}
