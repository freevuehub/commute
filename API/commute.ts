import { IResponseData } from '@/types'
import endpoint from './endpoint.config'
import { AxiosGet, AxiosPut, AxiosPost } from './util'

interface ICommuteListItem {
	companyName: string
	endDate: string
	id: number
	startDate: string
	tags: null
	totalWorkTime: number
}

interface ICommuteDetailResponse {
	comment: string
	companyAddress: string
	companyName: string
	companyZipCode: number
	endDate: string
	id: number
	latitude: number | null
	longitude: number | null
	startDate: string
	tags: null
	totalWorkTime: number
}

export interface ICommutePostItem {
	companyId: number
	startDate: string
	endDate: string | null
	comment: string | null
	tags: string | null
}

export const getCommuteList = async (page: number, limit: number, token: string = '') => {
	try {
		const params = { page, limit }

		const response: IResponseData<ICommuteListItem[]> = await AxiosGet<ICommuteListItem[]>(
			endpoint.commute.request.common(),
			token,
			params
		)

		return response
	} catch (err) {
		return err
	}
}

export const getCommuteItem = async (id: number, token: string = '') => {
	try {
		const response: IResponseData<ICommuteDetailResponse> = await AxiosGet<ICommuteDetailResponse>(
			endpoint.commute.request.hasId(id),
			token,
			{}
		)

		return response
	} catch (err) {
		return err
	}
}

export const postCommute = async (payload: ICommutePostItem, token: string = '') => {
	try {
		const formData = new FormData()
		const appendFormData = ([key, value]: [string, ICommutePostItem]) => {
			formData.append(key, `${value}`)
		}

		Object.entries(payload).forEach(appendFormData)

		const response = await AxiosPost(endpoint.commute.request.common(), token, formData)

		return response
	} catch (err) {
		return err
	}
}

export const putCommute = async (id: number, payload: ICommutePostItem, token: string = '') => {
	try {
		const response = await AxiosPut(endpoint.commute.request.hasId(id), token, payload)

		return response
	} catch (err) {
		return err
	}
}
