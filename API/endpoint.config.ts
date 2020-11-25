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
      today(): string
      week(): string
      month(): string
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
      detail(id: string): string
    }
  }
  vacation: {
    request: {
      list(): string
      detail(id: string): string
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
      today: () => `${SERVER}/main/today`,
      week: () => `${SERVER}/main/week`,
      month: () => `${SERVER}/main/month`,
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
      detail: (id: string) => `${SERVER}/company/${id}`,
    },
  },
  vacation: {
    request: {
      list: () => `${SERVER}/vacation`,
      detail: (id: string) => `${SERVER}/vacation/${id}`,
    },
  },
}

export default config
