import { reactive, SetupContext, computed } from '@vue/composition-api'
import { CompanyConstant } from '~/constant'
import { ICompanyListItemResponse } from '~/types'

interface IState {
  selectCompany: ICompanyListItemResponse
  searchText: string
  itemTextKey: string
  searchLoading: boolean
}

let searchTimeOut: any = null

export const uesState = () =>
  reactive<IState>({
    selectCompany: {
      id: 0,
      ceoName: '',
      companyAddress: '',
      companyEsName: null,
      companyLat: null,
      companyLong: null,
      companyName: '',
      companyZipCode: 0,
      contact: '',
      establishmenDate: '',
      webPage: null,
      imgUrl: null,
      industryName: '',
    },
    searchText: '',
    itemTextKey: 'companyName',
    searchLoading: false,
  })

export const useComputed = (context: SetupContext) =>
  reactive({
    companyList: computed(() => {
      return context.root.$store.getters[`company/${CompanyConstant.$Get.List}`]
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

export const useSelectCompanyWatch = (context: SetupContext) => (
  value: ICompanyListItemResponse
) => {
  context.emit('change', value)
}

export const useSearchFilter = () => (item: ICompanyListItemResponse, queryText: string) => {
  return item.companyName.includes(queryText) || item.companyEsName?.includes(queryText)
}
