import { reactive, computed, SetupContext } from '@vue/composition-api'

export interface IProps {
  page: number
  max: number
  total: number
}

interface IComputed {
  maxPageNo: number
  pageStandard: number
}

export const useComputed = (props: IProps) =>
  reactive({
    maxPageNo: computed(() => {
      return Math.ceil(props.total / props.max)
    }),
    pageStandard: computed(() => {
      return parseInt(`${(props.page - 1) / 5}`)
    }),
  })

export const usePageComputed = (compute: IComputed) =>
  reactive({
    pageList: computed(() => {
      const pages = []

      for (
        let index = compute.pageStandard * 5 + 1;
        index <= 5 * (compute.pageStandard + 1);
        index++
      ) {
        if (index > compute.maxPageNo) {
          break
        }

        pages.push(index)
      }

      return pages
    }),
  })

export const usePageBtnClick = ({ emit }: SetupContext) => (page: number) => {
  emit('click', page)
}
