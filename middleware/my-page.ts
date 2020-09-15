import { AuthConstant } from '~/constant'
import { getUserInfo } from '~/API'

export default async (context: any) => {
  const { $cookies, store, redirect }: any = context.app
  const token = $cookies.get('token')

  if (token) {
    const { result } = await getUserInfo(token)

    store.dispatch(`auth/${AuthConstant.$Call.Info}`, result)
  } else {
    redirect('/signin')
  }
}
