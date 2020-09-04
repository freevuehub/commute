import { AuthConstant } from '~/constant'
import { postGitHubSignIn, getUserData } from '~/API'

interface IProfile {
  avatarUrl: string
  email: string
  name: string
}
interface IState {
  profile: IProfile
}

export const state = (): IState => ({
  profile: {
    email: '',
    avatarUrl: '',
    name: '',
  },
})

export const mutations = {
  [AuthConstant.$Set.Profile](state: IState, payload: IProfile) {
    state.profile = payload
  },
}

export const actions = {
  async [AuthConstant.$Call.User](store: any) {
    const { result } = await getUserData()

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
