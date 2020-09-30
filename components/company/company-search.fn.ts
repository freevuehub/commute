import { reactive, SetupContext, computed } from '@vue/composition-api'
import { CompanyConstant } from '~/constant'
import { ICompanyListItemResponse } from '~/types'

interface IState {
  selectCompany: ICompanyListItemResponse
}

export const useState = () =>
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
  })

export const useComputed = (context: SetupContext) =>
  reactive({
    companyList: computed(() => {
      return context.root.$store.getters[`company/${CompanyConstant.$Get.List}`]
    }),
    isActions: computed(() => {
      return !!context.listeners.save
    }),
  })

export const useClose = (context: SetupContext) => () => {
  context.root.$store.dispatch(`company/${CompanyConstant.$Call.ListReset}`)

  context.emit('close')
}

export const useSave = (context: SetupContext, state: IState) => () => {
  context.emit('save', state.selectCompany.id)
}
