import { AuthConstant } from '~/constant'
import { getUserInfo } from '~/API'

export default async (context: any) => {
  const {
    app: { $cookies, store },
    redirect,
  }: any = context

  try {
    const token = $cookies.get('token')

    const { result } = await getUserInfo(token)

    store.dispatch(`auth/${AuthConstant.$Call.Info}`, result)
  } catch (err) {
    redirect('/signin')
  }
}
