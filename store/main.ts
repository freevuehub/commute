import { MainConstant } from '~/constant'
import { IMainData } from '~/types'

export interface IState {
	data: IMainData
}

export const state = () => ({
	data: {
		termAvg: 0,
		weekTermSum: 0,
		weekCount: 0,
		monthCount: 0,
		weekList: [],
		todayData: {
			id: 0,
			companyName: '',
			companyAddress: '',
			companyZipCode: null,
			latitude: null,
			longitude: null,
			totalWorkTime: 0,
			companyId: 0,
			startDate: '',
			endDate: null,
			comment: null,
			tags: null,
		},
	},
})

export const mutations = {
	[MainConstant.$Set.MainData](state: IState, payload: IMainData) {
		state.data = { ...state.data, ...payload }
	},
}

export const actions = {
	[MainConstant.$Call.MainData]: (store: any, payload: any) => {
		store.commit(MainConstant.$Set.MainData, payload)
	},
}

export const getters = {
	[MainConstant.$Get.MainData](state: IState): IMainData {
		return state.data
	},
}
