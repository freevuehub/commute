import axios, { AxiosResponse } from 'axios'
import { ICommuteItem, ICommutePostOrPutItem } from '@/types'
import endpoint from './endpoint.config'

interface IApiSuccessCode {
  status: number
}

interface IMainDataResponse extends IApiSuccessCode {
  result: ICommuteItem
}

interface ICommuteInsertResponse extends IApiSuccessCode {
  result: ICommutePostOrPutItem
}

interface ICommuteUpdateResponse extends IApiSuccessCode {
  result: ICommuteItem
}

interface ICommuteGetListResponse extends IApiSuccessCode {
  result: ICommuteItem[]
  totalCount: number
}

export const getMainData = (): Promise<IMainDataResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await axios.get(endpoint.main.request.data())

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

export const getCommuteList = (page: number, limit: number): Promise<ICommuteGetListResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const params = { page, limit }

        const response: AxiosResponse = await axios.get(endpoint.commute.request.common(), {
          params,
        })

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

export const postCommute = (payload: ICommutePostOrPutItem): Promise<ICommuteInsertResponse> => {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, `${value}`)
  })

  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await axios.post(
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
        const response: AxiosResponse = await axios.get(endpoint.commute.request.hasId(id))

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
  payload: ICommutePostOrPutItem
): Promise<ICommuteUpdateResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await axios.put(endpoint.commute.request.hasId(id), payload)

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
