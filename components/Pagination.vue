<template>
  <nav role="navigation" aria-label="Pagination Navigation">
    <ul class="v-pagination theme--light">
      <li>
        <button
          type="button"
          aria-label="Previous page"
          class="v-pagination__navigation ma-1"
          :class="{ 'v-pagination__navigation--disabled': page === 1 }"
          @click.prevent="onPageBtnClick(page - 1)"
        >
          <i aria-hidden="true" class="v-icon notranslate mdi mdi-chevron-left theme--light"></i>
        </button>
      </li>
      <li v-for="pageNo in pageComputed.pageList" :key="pageNo">
        <button
          type="button"
          aria-current="true"
          :aria-label="`Current Page, Page ${pageNo}`"
          class="v-pagination__item ma-1"
          :class="{ 'v-pagination__item--active primary': page === pageNo }"
          @click.prevent="onPageBtnClick(pageNo)"
        >
          <span>{{ pageNo }}</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          aria-label="Next page"
          class="v-pagination__navigation ma-1"
          :class="{ 'v-pagination__navigation--disabled': page >= computed.maxPageNo }"
          @click.prevent="onPageBtnClick(page + 1)"
        >
          <i aria-hidden="true" class="v-icon notranslate mdi mdi-chevron-right theme--light"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { useComputed, usePageComputed, IProps, usePageBtnClick } from './pagination.fn'

export default defineComponent({
  props: {
    page: Number,
    max: Number,
    total: Number,
  },
  model: {
    prop: 'page',
    event: 'click',
  },
  setup(props: IProps, vm: SetupContext) {
    const computed = useComputed(props)
    const pageComputed = usePageComputed(computed)
    const onPageBtnClick = usePageBtnClick(vm)

    return {
      computed,
      pageComputed,
      onPageBtnClick,
    }
  },
})
</script>

<style lang="scss">
.v-pagination__item,
.v-pagination__navigation {
  &:focus {
    outline: 0;
  }
}
</style>
