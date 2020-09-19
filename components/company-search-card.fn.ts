import { reactive, SetupContext, computed } from '@vue/composition-api'
import { CompanyConstant } from '~/constant'
import { ICompanyListItemResponse } from '~/types'

interface IState {
  headers: string[]
  selectCompany: ICompanyListItemResponse
  searchText: string
  itemTextKey: string
  searchLoading: boolean
}

let searchTimeOut: any = null

export const uesState = () =>
  reactive<IState>({
    headers: ['회사', '대표', '연락처', '주요 사업'],
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

export const useClose = (context: SetupContext) => () => {
  context.root.$store.dispatch(`company/${CompanyConstant.$Call.ListReset}`)

  context.emit('close')
}

export const useSave = (context: SetupContext, state: IState) => () => {
  context.emit('save', state.selectCompany.id)
}

export const useSearchFilter = () => (item: ICompanyListItemResponse, queryText: string) => {
  return item.companyName.includes(queryText) || item.companyEsName?.includes(queryText)
}
