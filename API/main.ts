import { IResponseData, IMainWeekData } from '@/types'
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

interface IMainDataResponse extends IMainWeekData {
  monthCount: number
  monthTermAvg: number
  monthTermSum: number
  todayData: ITodayData
}

export const getMainData = async (token: string = '') => {
  try {
    const response: IResponseData<IMainDataResponse> = await AxiosGet<IMainDataResponse>(
      endpoint.main.request.data(),
      token,
      {}
    )

    return response
  } catch (err) {
    return err
  }
}

export const getMainTodayData = async (token: string = '') => {
  try {
    const response: IResponseData<any> = await AxiosGet<any>(
      endpoint.main.request.today(),
      token,
      {}
    )

    return response
  } catch (err) {
    return err
  }
}

export const getWeekTodayData = async (token: string = '') => {
  try {
    const response: IResponseData<IMainWeekData> = await AxiosGet<IMainWeekData>(
      endpoint.main.request.week(),
      token,
      {}
    )

    return response
  } catch (err) {
    return err
  }
}
