import { AuthConstant } from '~/constant'
import { postGitHubSignIn, getUserProfile, getUserInfo } from '~/API'

interface IProfile {
  avatarUrl: string
  email: string
  name: string
}

interface IUserInfo {
  companyAddress: string
  companyLat: number | null
  companyLong: number | null
  companyName: string
  companyZipCode: number
  isWork: boolean
  lunchEndTime: string
  lunchStartTime: string
  lunchTerm: number
  workEndTime: string
  workStartTime: string
  workTerm: number
}
interface IState {
  profile: IProfile
  userInfo: IUserInfo
}

export const state = (): IState => ({
  profile: {
    email: '',
    avatarUrl: '',
    name: '',
  },
  userInfo: {
    companyAddress: '',
    companyLat: null,
    companyLong: null,
    companyName: '',
    companyZipCode: 0,
    isWork: false,
    lunchEndTime: '',
    lunchStartTime: '',
    lunchTerm: 0,
    workEndTime: '',
    workStartTime: '',
    workTerm: 0,
  },
})

export const mutations = {
  [AuthConstant.$Set.Profile](state: IState, payload: IProfile) {
    state.profile = payload
  },
  [AuthConstant.$Set.Info](state: IState, payload: IUserInfo) {
    state.userInfo = payload
  },
}

export const actions = {
  async [AuthConstant.$Call.Info](store: any) {
    const { result } = await getUserInfo()

    store.commit(AuthConstant.$Set.Info, result)
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
