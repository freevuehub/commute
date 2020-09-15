import { AuthConstant } from '~/constant'
import { getUserInfo } from '~/API'

export default async (context: any) => {
  const { $cookies }: any = context

  const { result } = await getUserInfo($cookies.get('token'))

  context.store.dispatch(`auth/${AuthConstant.$Call.Info}`, result)
}
