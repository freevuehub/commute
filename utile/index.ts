import dayjs from 'dayjs'

export const makeDefaultFormat = (time: string) => `${dayjs().format('YYYY-MM-DD')} ${time}`

export const makeTerm = (start: string, end: string) => {
  return dayjs(start, 'YYYY-MM-DD HH:mm').diff(dayjs(end, 'YYYY-MM-DD HH:mm'), 'minute')
}
