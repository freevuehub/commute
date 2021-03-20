import { reactive, SetupContext, computed } from '@vue/composition-api'
import { AuthConstant } from '~/constant'

interface IProps {
  edit: boolean
  title: string
  index: number
}

interface IState {
  timeout: ReturnType<typeof setTimeout> | null
  isCardMove: boolean
  isMoving: boolean
  startX: number
  startY: number
  moveX: number
  moveY: number
  cardStyle: {
    x: number
    y: number
  }
}

const noScroll = () => {
  window.scrollTo(0, 0)
}
const timer = 300
const padding = 24

export const useState = () =>
  reactive<IState>({
    timeout: null,
    isCardMove: false,
    isMoving: false,
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    cardStyle: {
      x: 0,
      y: 0,
    },
  })

export const useComputed = (state: IState) => ({
  styleSet: computed(() => {
    return {
      transition: `transform ${state.isCardMove ? 0 : timer}ms`, // state.isCardMove ? 'transform 0s' : 'transform 0.3s',
      transform: `translate(${state.moveX}px, ${state.moveY}px)`,
      zIndex: state.isMoving ? 11 : 1,
      position: 'relative',
    }
  }),
})

export const useCardTouchStart = (context: SetupContext, state: IState) => () => {
  const useTimeOut = () => {
    context.emit('editing', true)
  }

  state.timeout = setTimeout(useTimeOut, 2000)
}

export const useCardTouchEnd = (state: IState) => () => {
  if (state.timeout !== null) {
    clearTimeout(state.timeout)
  }
}

export const useCardMoveStart = (state: IState) => (event: TouchEvent) => {
  const { clientX, clientY } = event.touches[0]
  const htmlDom: any = document.querySelector('html')

  state.startX = clientX - state.moveX
  state.startY = clientY - state.moveY
  state.isCardMove = true

  htmlDom.className = 'overflow-y-hidden'

  window.addEventListener('scroll', noScroll)
}

export const useCardMove = (context: SetupContext, props: IProps, state: IState) => (
  event: TouchEvent
) => {
  event.stopPropagation()

  const { refs }: any = context
  const cardDom: any = refs['dash-card']
  const { clientX, clientY } = event.touches[0]
  const sense = (cardDom.$el.offsetHeight + padding) / 2

  state.isMoving = true
  state.moveX = clientX - state.startX
  state.moveY = clientY - state.startY

  if (state.moveY < sense * -1) {
    context.root.$store.dispatch(`auth/${AuthConstant.$Call.DashBoardEdit}`, {
      command: 'up',
      index: props.index,
    })
  } else if (state.moveY > sense) {
    context.root.$store.dispatch(`auth/${AuthConstant.$Call.DashBoardEdit}`, {
      command: 'down',
      index: props.index,
    })
  }
}

export const useCardMoveEnd = (state: IState) => () => {
  const htmlDom: any = document.querySelector('html')

  state.isCardMove = false
  state.moveX = 0
  state.moveY = 0

  setTimeout(() => {
    state.isMoving = false

    htmlDom.className = ''

    window.removeEventListener('scroll', noScroll)
  }, timer)
}
