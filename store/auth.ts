import dayjs from 'dayjs'
import { AuthConstant } from '~/constant'
import { postGitHubSignIn, getUserProfile, putUserInfo } from '~/API'
import { IUserInfo, IUserInfoPutPayload, IUserProfile } from '~/types'

interface IState {
  profile: IUserProfile
  userInfo: IUserInfo
}

export const state = (): IState => ({
  profile: {
    email: '',
    avatarUrl: '',
    name: '',
    companyId: 1,
    isWork: false,
    lunchEndTime: '',
    lunchStartTime: '',
    lunchTerm: 0,
    workEndTime: '',
    workStartTime: '',
    workTerm: 0,
    theme: {
      dashboard: [],
    },
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
  [AuthConstant.$Set.Profile](store: IState, payload: IUserProfile) {
    store.profile = payload
  },
  [AuthConstant.$Set.Info](store: IState, payload: IUserInfo) {
    store.userInfo = payload
  },
}

export const actions = {
  [AuthConstant.$Call.Info](store: any, payload: IUserInfo) {
    store.commit(AuthConstant.$Set.Info, payload)
  },
  async [AuthConstant.$Call.Profile](store: any) {
    const { result } = await getUserProfile()

    store.commit(AuthConstant.$Set.Profile, result.profile)
  },
  async [AuthConstant.$Call.GitHubSignin](_: any, payload: string) {
    try {
      const { result } = await postGitHubSignIn(payload)

      const expiresDay = dayjs().add(1, 'month').toString()

      document.cookie = `token=${result.token}; expires=${expiresDay}`
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async [AuthConstant.$Call.InfoPut](store: any, payload: IUserInfoPutPayload) {
    try {
      const { result } = await putUserInfo(payload)

      store.commit(AuthConstant.$Set.Info, result)
    } catch (err) {
      return Promise.reject(err)
    }
  },
}

export const getters = {
  [AuthConstant.$Get.Profile](store: IState) {
    return store.profile
  },
  [AuthConstant.$Get.Info](store: IState) {
    return store.userInfo
  },
}
