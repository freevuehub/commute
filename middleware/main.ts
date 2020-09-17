import { MainConstant } from '~/constant'
import { getMainData } from '~/API'

export default async (context: any) => {
	const {
		app: { $cookies, store },
		redirect,
	}: any = context

	try {
		const token = $cookies.get('token')

		const { result } = await getMainData(token)

		store.dispatch(`main/${MainConstant.$Call.MainData}`, result)
	} catch (err) {
		redirect('/signin')
	}
}
