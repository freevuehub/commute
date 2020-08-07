export interface IMainData {
  companyId: number
  companyName: string
  commuteId: number
  endDate: string | null
  startDate: string | null
}

export interface ICommutePostOrPutItem {
  companyId: number | null
  startDate: string
  endDate: string | null
  comment: string | null
  tags: string | null
}

export interface ICommuteItem extends ICommutePostOrPutItem {
  commuteId: number | null
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
