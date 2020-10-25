export type Task = {
  start: string
  end?: string
  message: string
  id: number | string
}

export type Week = {
  start: Date
  end: Date
}

export type State = {
  currentTasks: Task[]
  eventMode: boolean
  lang: string
  period: {
    selectedMonth: number
    selectedDate: Date
    type: string
  }
  taskList: Task[]
  week: Week[]
}
