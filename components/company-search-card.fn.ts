import { reactive, SetupContext, computed } from '@vue/composition-api'
import { CompanyConstant } from '~/constant'

interface IState {
  headers: string[]
  searchText: string
  searchLoading: boolean
}

let searchTimeOut: any = null

export const uesState = () =>
  reactive<IState>({
    headers: ['회사', '대표', '연락처', '주요 사업'],
    searchText: '',
    searchLoading: false,
  })

export const useComputed = (context: SetupContext) =>
  reactive({
    companyList: computed(() => {
      return context.root.$store.getters[`company/${CompanyConstant.$Get.List}`]
    }),
  })

export const useSearchTextWatch = (context: SetupContext, state: IState) => (value: string) => {
  state.searchLoading = true

  const companySearchTimeOut = async () => {
    await context.root.$store.dispatch(`company/${CompanyConstant.$Call.List}`, value)

    state.searchLoading = false
  }

  clearTimeout(searchTimeOut)

  searchTimeOut = setTimeout(companySearchTimeOut, 1000)
}

export const useClose = (context: SetupContext) => () => {
  context.root.$store.dispatch(`company/${CompanyConstant.$Call.ListReset}`)

  context.emit('close')
}
