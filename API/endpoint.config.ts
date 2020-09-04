const PTOTOCOL = process.env.API_PROTOCOL
const URL = process.env.API_URL
const SERVER = `${PTOTOCOL}${URL}`

interface IConfig {
  user: {
    request: {
      user(): string
      github(): string
    }
  }
  main: {
    request: {
      data(): string
    }
  }
  commute: {
    request: {
      common(): string
      hasId(id: number): string
    }
  }
}

// process.env.production 분기!!
const config: IConfig = {
  user: {
    request: {
      user: () => `${SERVER}/user`,
      github: () => `${SERVER}/user/github`,
    },
  },
  main: {
    request: {
      data: () => `${SERVER}/main`,
    },
  },
  commute: {
    request: {
      common: () => `${SERVER}/commute`,
      hasId: (id: number) => `${SERVER}/commute/${id}`,
    },
  },
}

export default config
