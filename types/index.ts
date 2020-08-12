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
export interface IResponseData<T> {
  result: T
  status: 2000
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
