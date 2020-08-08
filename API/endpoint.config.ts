const PTOTOCOL = process.env.API_PROTOCOL
const URL = process.env.API_URL
const SERVER = `${PTOTOCOL}${URL}`

interface IConfig {
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
