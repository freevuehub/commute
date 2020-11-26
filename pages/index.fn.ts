import { reactive, computed, SetupContext, ComputedRef } from '@vue/composition-api'
import { IUserProfile } from '~/types'
import { MainConstant, AuthConstant } from '~/constant'

export interface IState {
  bottomModalStataue: boolean
  mainData: any
}

export interface IComputed {
  userProfile: ComputedRef<IUserProfile>
}

export const useState = ({ root }: SetupContext) =>
  reactive<IState>({
    bottomModalStataue: false,
    mainData: computed(() => {
      const data = root.$store.getters[`main/${MainConstant.$Get.MainData}`]

      return {
        ...data,
      }
    }),
  })

export const useComputed = (context: SetupContext) =>
  reactive<IComputed>({
    userProfile: computed(() => {
      return context.root.$store.getters[`auth/${AuthConstant.$Get.Profile}`]
    }),
  })

export const useSheetClose = (state: IState) => () => {
  state.bottomModalStataue = false
}
