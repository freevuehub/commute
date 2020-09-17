import { ICommuteItem, ICommuteItemOfAPI, IResponseData } from '@/types'
import endpoint from './endpoint.config'
import { AxiosGet, AxiosPut, AxiosPost } from './util'
import instance, { AxiosResponse } from './instance'

interface IApiSuccessCode {
	status: number
}

interface ICommuteInsertResponse extends IApiSuccessCode {
	result: ICommuteItemOfAPI
}

interface ICommuteUpdateResponse extends IApiSuccessCode {
	result: ICommuteItem
}

interface ICommuteListResponse extends IApiSuccessCode {
	result: ICommuteItem[]
	totalCount: number
}

export const getCommuteList = async (page: number, limit: number, token: string = '') => {
	try {
		const params = { page, limit }

		const response = await AxiosGet(endpoint.commute.request.common(), token, params)

		return response
	} catch (err) {
		return err
	}
}

export const postCommute = (payload: ICommuteItemOfAPI): Promise<ICommuteInsertResponse> => {
	const formData = new FormData()
	const appendFormData = ([key, value]: [string, ICommuteItemOfAPI]) => {
		formData.append(key, `${value}`)
	}

	Object.entries(payload).forEach(appendFormData)

	return new Promise((resolve, reject) => {
		;(async () => {
			try {
				const response: AxiosResponse = await instance.post(
					endpoint.commute.request.common(),
					formData
				)

				if (response.data.status === 2000) {
					resolve(response.data)
				} else {
					reject(response)
				}
			} catch (err) {
				reject(err)
			}
		})()
	})
}

export const getCommuteItem = (id: number): Promise<ICommuteUpdateResponse> => {
	return new Promise((resolve, reject) => {
		;(async () => {
			try {
				const response: AxiosResponse = await instance.get(endpoint.commute.request.hasId(id))

				if (response.data.status === 2000) {
					resolve(response.data)
				} else {
					reject(response)
				}
			} catch (err) {
				reject(err)
			}
		})()
	})
}

export const putCommute = (
	id: number,
	payload: ICommuteItemOfAPI
): Promise<ICommuteUpdateResponse> => {
	return new Promise((resolve, reject) => {
		;(async () => {
			try {
				const response: AxiosResponse = await instance.put(
					endpoint.commute.request.hasId(id),
					payload
				)

				if (response.data.status === 2000) {
					resolve(response.data)
				} else {
					reject(response)
				}
			} catch (err) {
				reject(err)
			}
		})()
	})
}
