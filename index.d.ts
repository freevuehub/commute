// import { Store } from 'vuex'

declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

// export declare class TypeStroe extends Store<any> {
//   readonly state: any
//   readonly getters: any
// }

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     store?: TypeStroe
//   }
// }

// declare module 'vue/types/vue' {
//   interface Vue {
//     $store: TypeStroe
//   }
// }
