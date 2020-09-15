import { ICommuteItem, ICommuteItemOfAPI, IUserInfo, IUserInfoPutPayload } from '@/types'
import instance, { AxiosResponse } from './instance'
import endpoint from './endpoint.config'

interface IApiSuccessCode {
  status: number
}

interface IMainDataResponse extends IApiSuccessCode {
  result: ICommuteItem
}

interface ICommuteInsertResponse extends IApiSuccessCode {
  result: ICommuteItemOfAPI
}

interface ICommuteUpdateResponse extends IApiSuccessCode {
  result: ICommuteItem
}

interface ICommuteGetListResponse extends IApiSuccessCode {
  result: ICommuteItem[]
  totalCount: number
}

interface IUserAuthResponse extends IApiSuccessCode {
  result: {
    token: string
    profile: {
      avatarUrl: string
      email: string
      name: string
    }
  }
}

interface IUserInfoResponse extends IApiSuccessCode {
  result: IUserInfo
}

export const getUserInfo = (token: string = ''): Promise<IUserInfoResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.get(
          endpoint.user.request.info(),
          token
            ? {
                headers: { Authorization: token },
              }
            : {}
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

export const putUserInfo = (payload: IUserInfoPutPayload): Promise<IUserInfoResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.put(endpoint.user.request.info(), payload)

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

export const getUserProfile = (): Promise<IUserAuthResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.get(endpoint.user.request.profile())

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

export const postGitHubSignIn = (code: string): Promise<IUserAuthResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const formData = new FormData()

        formData.append('code', code)

        const response: AxiosResponse = await instance.post(
          endpoint.user.request.github(),
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

export const getMainData = (): Promise<IMainDataResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.get(endpoint.main.request.data())

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

        const response: AxiosResponse = await instance.get(endpoint.commute.request.common(), {
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

export const postCommute = (payload: ICommuteItemOfAPI): Promise<ICommuteInsertResponse> => {
  const formData = new FormData()
  const appendFormData = ([key, value]: [string, ICommuteItemOfAPI]) => {
    formData.append(key, `${value}`)
  }

  Object.entries(payload).forEach(appendFormData)

  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.post(
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
        const response: AxiosResponse = await instance.get(endpoint.commute.request.hasId(id))

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
  payload: ICommuteItemOfAPI
): Promise<ICommuteUpdateResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.put(
          endpoint.commute.request.hasId(id),
          payload
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
