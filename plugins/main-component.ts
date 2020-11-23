import Vue from 'vue'
import { TodayTotalData, WeekTotalData, MonthTotalData } from '~/components'

Vue.component('today', TodayTotalData)
Vue.component('week', WeekTotalData)
Vue.component('month', MonthTotalData)
