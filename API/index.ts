import { ICommuteItem, ICommuteItemOfAPI } from '@/types'
import instance, { AxiosResponse } from './instance'
import endpoint from './endpoint.config'

instance.interceptors.request.use((config) => {
  const cookieList = document.cookie.split(';').reduce(
    (prev, cur) => {
      const [key, value] = cur.trim().split('=')

      return { ...prev, [key]: value }
    },
    { token: '' }
  )

  config.headers = { authorization: cookieList.token }

  return config
})

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

interface IUserAuthResponseResponse extends IApiSuccessCode {
  result: {
    token: string
    profile: {
      avatarUrl: string
      email: string
      name: string
    }
  }
}

export const getUserData = (): Promise<IUserAuthResponseResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await instance.get(endpoint.user.request.user())

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

export const postGitHubSignIn = (code: string): Promise<IUserAuthResponseResponse> => {
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
