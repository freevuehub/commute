import { reactive, SetupContext, computed } from '@vue/composition-api'
import { CompanyConstant } from '~/constant'
import { ICompanyListItemResponse } from '~/types'

interface IState {
  headers: string[]
  selectCompany: [] | ICompanyListItemResponse[]
  searchText: string
  itemTextKey: string
  searchLoading: boolean
}

let searchTimeOut: any = null

export const uesState = () =>
  reactive<IState>({
    headers: ['회사', '대표', '연락처', '주요 사업'],
    selectCompany: [],
    searchText: '',
    itemTextKey: 'companyName',
    searchLoading: false,
  })

export const useComputed = (context: SetupContext) =>
  reactive({
    companyList: computed(() => {
      const list = context.root.$store.getters[`company/${CompanyConstant.$Get.List}`]

      return list

      // return list.map((company: ICompanyListItemResponse) => ({
      //   id: company.id,
      //   text: company.companyName,
      // }))
    }),
  })

export const useSearchTextWatch = (context: SetupContext, state: IState) => (value: string) => {
  if (state.searchLoading || !state.searchText || state.searchText.length < 2) {
    return
  }

  const companySearchTimeOut = async () => {
    state.searchLoading = true

    await context.root.$store.dispatch(`company/${CompanyConstant.$Call.List}`, value)

    state.searchLoading = false
  }

  clearTimeout(searchTimeOut)

  searchTimeOut = setTimeout(companySearchTimeOut, 500)
}

export const useClose = (context: SetupContext) => () => {
  context.root.$store.dispatch(`company/${CompanyConstant.$Call.ListReset}`)

  context.emit('close')
}

export const useSearchFilter = () => (item: ICompanyListItemResponse, queryText: string) => {
  return item.companyName.includes(queryText) || item.companyEsName?.includes(queryText)
}
