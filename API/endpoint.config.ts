const SERVER = 'http://freevue.synology.me:32809'

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
    },
  },
}

export default config
