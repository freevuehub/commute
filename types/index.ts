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

// Company에 대한 Type
export interface ICompanyDetailResponse {
  industryName: string
  ceoName: string
  companyAddress: string
  companyLat: number | null
  companyLong: number | null
  companyName: string
  companyZipCode: number
  contact: string
  establishmenDate: string
  size: string
  imgUrl: string | null
}

export interface ICompanyListItemResponse {
  id: number
  ceoName: string
  companyAddress: string
  companyEsName: string | null
  companyLat: number | null
  companyLong: number | null
  companyName: string
  companyZipCode: number
  contact: string
  establishmenDate: string
  webPage: string | null
  imgUrl: string | null
  industryName: string
}

// Commute에 대한 Type
export interface ICommuteDetailResponse {
  comment: string | null
  company: ICompanyDetailResponse
  endDate: string | null
  id: string
  startDate: string | null
  tags: null
  totalWorkTime: number
}
export interface ICommuteListItem {
  companyName: string
  endDate: string
  id: string
  startDate: string
  tags: null
  totalWorkTime: number
}

export interface ICommuteOfPutAPI<T> {
  id: string
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
  id: string
  companyName: string
  companyAddress: string
  companyZipCode: number | null
  latitude: number | null
  longitude: number | null
  totalWorkTime: number
}

// Main data Type
export interface IMainData {
  weekTermAvg: number
  weekTermSum: number
  monthTermAvg: number
  monthTermSum: number
  weekCount: number
  monthCount: number
  weekList: ICommuteItem[]
}

export interface IMainWeekListItem {
  id: string
  companyName: string
  totalWorkTime: number
  startDate: string
  endDate: string
  tags: null
}

export interface IMainTodayData {
  id: string
  companyName: string
  totalWorkTime: number
  startDate: string
  endDate: string | null
}

export interface IMainWeekData {
  weekCount: number
  weekList: IMainWeekListItem[] | null[]
  weekTermAvg: number
  weekTermSum: number
}

export interface IMainMonthData {
  monthTermSum: number
  monthTermAvg: number
  monthCount: number
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
