const PTOTOCOL = process.env.API_PROTOCOL
const URL = process.env.API_URL
const SERVER = `${PTOTOCOL}${URL}`

interface IConfig {
  user: {
    request: {
      info(): string
      profile(): string
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
      hasId(id: string): string
    }
  }
  company: {
    request: {
      list(): string
    }
  }
}

// process.env.production 분기!!
const config: IConfig = {
  user: {
    request: {
      info: () => `${SERVER}/user/info`,
      profile: () => `${SERVER}/user/profile`,
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
      hasId: (id: string) => `${SERVER}/commute/${id}`,
    },
  },
  company: {
    request: {
      list: () => `${SERVER}/company`,
    },
  },
}

export default config
