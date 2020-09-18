import { IResponseData, ICompanyListItemResponse } from '@/types'
import endpoint from './endpoint.config'
import { AxiosGet } from './util'

export const getCompanyList = async (searchText: string, token: string = '') => {
  try {
    const response: IResponseData<ICompanyListItemResponse> = await AxiosGet<
      ICompanyListItemResponse
    >(endpoint.company.request.list(), token, { searchText })

    return response
  } catch (err) {
    return err
  }
}
