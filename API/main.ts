import { IResponseData } from '@/types'
import endpoint from './endpoint.config'
import { AxiosGet } from './util'

interface ITodayData {
	comment: string
	companyAddress: string
	companyId: number
	companyName: string
	companyZipCode: number
	endDate: null
	id: number
	latitude: number | null
	longitude: number | null
	startDate: string
	tags: null
	totalWorkTime: number
}

interface IWeekListItem {
	comment: string
	companyAddress: string
	companyId: number
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

interface IMainDataResponse {
	monthCount: number
	monthTermAvg: number
	monthTermSum: number
	todayData: ITodayData
	weekCount: number
	weekList: IWeekListItem[] | null[]
	weekTermAvg: number
	weekTermSum: number
}

export const getMainData = async (token: string = '') => {
	try {
		const response: IResponseData<IMainDataResponse> = await AxiosGet<IMainDataResponse>(
			endpoint.main.request.data(),
			token
		)

		return response
	} catch (err) {
		return err
	}
}
