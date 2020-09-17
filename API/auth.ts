import { IResponseData, IUserProfile, IUserInfoPutPayload } from '@/types'
import endpoint from './endpoint.config'
import { AxiosGet, AxiosPut, AxiosPost } from './util'

interface IUserProfileResponse {
	token: string
	profile: IUserProfile
}

export const getUserInfo = async (token: string = '') => {
	try {
		const response = await AxiosGet(endpoint.user.request.info(), token, {})

		return response
	} catch (err) {
		return err
	}
}

export const putUserInfo = async (payload: IUserInfoPutPayload, token: string = '') => {
	try {
		const response = await AxiosPut<IUserInfoPutPayload>(
			endpoint.user.request.info(),
			token,
			payload
		)

		return response
	} catch (err) {
		return err
	}
}

export const getUserProfile = async (token: string = '') => {
	try {
		const response: IResponseData<IUserProfileResponse> = await AxiosGet<IUserProfileResponse>(
			endpoint.user.request.profile(),
			token,
			{}
		)

		return response
	} catch (err) {
		return err
	}
}

export const postGitHubSignIn = async (code: string, token: string = '') => {
	try {
		const formData = new FormData()

		formData.append('code', code)

		const response = await AxiosPost(endpoint.user.request.github(), token, formData)

		return response
	} catch (err) {
		return err
	}
}
