import dayjs from 'dayjs'
import { reactive, computed, SetupContext } from '@vue/composition-api'
import { CommuteConstant } from '~/constant'
import { ICommuteItem } from '~/types'

export const useState = () =>
  reactive({
    headers: ['일자', '회사', '출근시간', '퇴근시간'],
  })

export const useComputed = ({ root }: SetupContext) =>
  reactive({
    commuteList: computed(() => {
      const storeList = root.$store.getters[`commute/${CommuteConstant.$Get.CommuteList}`]

      return storeList.map((item: ICommuteItem) => ({
        ...item,
        date: dayjs(item.startDate).format('YYYY-MM-DD'),
        startDate: dayjs(item.startDate).format('HH:mm'),
        endDate: item.endDate ? dayjs(item.endDate).format('HH:mm') : 'N/A',
      }))
    }),
  })

export const useBeforeMounted = ({ root }: SetupContext) => async () => {
  await root.$store.dispatch(`commute/${CommuteConstant.$Call.CommuteGetList}`, {
    page: 1,
    limit: 20,
  })
}

export const useCommuteItemClick = ({ root }: SetupContext) => (id: number) => {
  root.$router.push(`/commute/${id}`)
}
