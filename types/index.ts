// API 서버 통신 성공시 나오는 Type
export interface IResponseData<T> {
	result: T
	status: number
}

// Auth / User에서 사용하는 Type
export interface IUserProfile {
	avatarUrl: string
	email: string
	name: string
	companyId: number
	isWork: boolean
	lunchEndTime: string
	lunchStartTime: string
	lunchTerm: number
	workEndTime: string
	workStartTime: string
	workTerm: number
}

export interface ICommuteOfPutAPI<T> {
	id: number
	payload: T
}

export interface ICommuteItemOfAPI {
	companyId: number
	startDate: string
	endDate: string | null
	comment: string | null
	tags: string | null
}

export interface ICommuteItem extends ICommuteItemOfAPI {
	id: number
	companyName: string
	companyAddress: string
	companyZipCode: number | null
	latitude: number | null
	longitude: number | null
	totalWorkTime: number
}

export interface IMainData {
	weekTermAvg: number
	weekTermSum: number
	monthTermAvg: number
	monthTermSum: number
	weekCount: number
	monthCount: number
	weekList: ICommuteItem[]
	todayData: ICommuteItem
}

export interface IUserInfo {
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

export interface IUserInfoPutPayload {
	id: number
	companyId: number | null
	isWork: boolean | null
	lunchEndTime: string | null
	lunchStartTime: string | null
	workEndTime: string | null
	workStartTime: string | null
}
