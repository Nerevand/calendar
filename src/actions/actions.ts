import  { Task, Week } from '../typedefs'

export const changeSelectedMonth = (month: number) => ({
  type: "CHANGE_MONTH",
  payload: {
    selectedMonth: month,
  },
});

export const changeSelectedDate = (date: string) => ({
  type: "CHANGE_DATE",
  payload: {
    selectedDate: date,
  },
});

export const changeLanguage: any = (payload: string) => ({
  type: "CHANGE_LANGUAGE",
  payload,
});

export const changeEventStatus: any = (payload: boolean) => ({
  type: "CHANGE_EVENT_STATUS",
  payload,
});

export const fetchCurrentTasks: any = (payload: Task[]) => ({
  type: "FETCH_USER_TASKS",
  payload,
});

export const fetchAllTasks: any = (payload: Task[]) => ({
  type: "FETCH_TASKS",
  payload,
});

export const changePeriodType: any = (payload: string) => ({
  type: "CHANGE_TYPE",
  payload,
});

export const setWeek: any = (payload: Week) => ({
  type: "SET_WEEK",
  payload,
});