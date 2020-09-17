import instance, { AxiosResponse } from './instance'
import { IResponseData } from '~/types'

type IAR<R> = AxiosResponse<IResponseData<R>>

export const bulidHeaderItem = (token: string) => {
	return {
		headers: token ? { Authorization: token } : {},
	}
}

export const filterStatus = <R = any>(response: IAR<R>) => {
	if (response.data.status === 2000) {
		return Promise.resolve(response.data)
	} else {
		return Promise.reject(response)
	}
}

export const AxiosGet = async <T = any, R = any>(URL: string, token: string, params: T) => {
	try {
		const response: IAR<R> = await instance.get(URL, {
			...bulidHeaderItem(token),
			params: params || {},
		})

		return filterStatus<R>(response)
	} catch (err) {
		return err
	}
}

export const AxiosPut = async <T, R = any>(URL: string, token: string, payload: T) => {
	try {
		const response: IAR<R> = await instance.put(URL, payload, bulidHeaderItem(token))

		return filterStatus<R>(response)
	} catch (err) {
		return err
	}
}

export const AxiosPost = async <T, R = any>(URL: string, token: string, formData: T) => {
	try {
		const response: IAR<R> = await instance.post(URL, formData, bulidHeaderItem(token))

		return filterStatus<R>(response)
	} catch (err) {
		return err
	}
}
