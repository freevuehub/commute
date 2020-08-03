const PTOTOCOL = process.env.API_PROTOCOL
const URL = process.env.API_URL
const PORT = process.env.API_PORT
const SERVER = `${PTOTOCOL}${URL}:${PORT}`

interface IConfig {
  main: {
    request: {
      data(): string
    }
  }
  commute: {
    request: {
      insert(): string
      update(id: number): string
      getList(): string
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
      insert: () => `${SERVER}/commute`,
      update: (id: number) => `${SERVER}/commute/${id}`,
      getList: () => `${SERVER}/commute`,
    },
  },
}

export default config
