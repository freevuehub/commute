import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { reactive, computed, SetupContext } from '@vue/composition-api'
import { CommuteConstant } from '~/constant'
import { ICommuteItem } from '~/types'

interface IState {
  headers: string[]
  page: number
  limit: number
}

const loadCommuteList = async (root: any, page: number, limit: number) => {
  await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommuteGetList}`, { page, limit })
}

export const useState = ({ root }: SetupContext) =>
  reactive<IState>({
    headers: ['일자', '회사', '출근시간', '퇴근시간', '업무시간'],
    page: Number(root.$route.query.page || 1),
    limit: 20,
  })

export const useComputed = ({ root }: SetupContext) =>
  reactive({
    commuteList: computed(() => {
      const storeList = root.$store.getters[`commute/${CommuteConstant.$Get.CommuteList}`]

      return storeList.map((item: ICommuteItem) => ({
        ...item,
        date: dayjs(item.startDate).locale('ko').format('YYYY-MM-DD'),
        startDate: dayjs(item.startDate).locale('ko').format('HH:mm'),
        endDate: item.endDate ? dayjs(item.endDate).locale('ko').format('HH:mm') : 'N/A',
        totalWorkTime: item.totalWorkTime
          ? `${Math.floor(item.totalWorkTime / 60) - 1}시간 ${item.totalWorkTime % 60}분`
          : 'N/A',
      }))
    }),
    total: computed(() => {
      return root.$store.getters[`commute/${CommuteConstant.$Get.CommuteListTotal}`]
    }),
  })

export const useBeforeMounted = ({ root }: SetupContext, state: IState) => async () => {
  await loadCommuteList(root, state.page, state.limit)
}

export const useCommuteItemClick = ({ root }: SetupContext) => (id: number) => {
  root.$router.push(`/commute/${id}`)
}

export const usePageWatch = ({ root }: SetupContext, state: IState) => async (page: number) => {
  root.$router.push({ query: { page: `${page}` } })

  await loadCommuteList(root, page, state.limit)
}
