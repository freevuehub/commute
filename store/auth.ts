import { AuthConstant } from '~/constant'
import { postGitHubSignIn, getUserProfile, putUserInfo } from '~/API'
import { IUserInfo, IUserInfoPutPayload } from '~/types'

interface IProfile {
	avatarUrl: string
	email: string
	name: string
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
	[AuthConstant.$Call.Info](store: any, payload: IUserInfo) {
		store.commit(AuthConstant.$Set.Info, payload)
	},
	async [AuthConstant.$Call.Profile](store: any) {
		const { result } = await getUserProfile()

		store.commit(AuthConstant.$Set.Profile, result.profile)
	},
	async [AuthConstant.$Call.GitHubSigin](_: any, payload: string) {
		try {
			const { result } = await postGitHubSignIn(payload)

			document.cookie = `token=${result.token};`
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
	[AuthConstant.$Get.Profile](state: IState) {
		return state.profile
	},
	[AuthConstant.$Get.Info](state: IState) {
		return state.userInfo
	},
}
