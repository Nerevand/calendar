import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'clsx'
import { withTranslation } from "react-i18next";
import {
  getHours,
  format,
  isSameDay,
  parseISO,
  eachDayOfInterval,
  eachHourOfInterval,
  addHours,
  getTime,
  differenceInHours
} from 'date-fns';

import { DAYS } from 'invariants'
import { Task, Week, State } from 'typedefs'
import {
  changeSelectedDate,
  fetchCurrentTasks,
  fetchAllTasks
} from 'actions'

type CalendarProps = {
  changeSelectedDate: any,
  fetchCurrentTasks: any,
  fetchAllTasks: any
  eventMode: boolean,
  taskList: any[],
  week: Week,
  t?: Function
}

const WeeklyCalendar: React.FC<CalendarProps> = (props) => {
  const dispatch = useDispatch()
  const { eventMode, taskList, week } = useSelector((state: State) => ({
    eventMode: state.eventMode,
    taskList: state.taskList,
    week: state.week,
  }))

  const [highlitedDate, setHighlitedDate] = useState<Date>(new Date())
  const [selectedTimes, setSelectedTimes] = useState<any>({
    start: null,
    end: null
  })

  const handleSetAction = () => {
    let { start, end } = selectedTimes

    if (start && end) {
      const message = prompt('task', '')
      const newTask: Task[] = []
      const id = getTime(new Date())

      if (!message) {
        return
      }

      if (start > end) {
        let temporary = start
        start = end
        end = temporary
        temporary = null
      }

      newTask.push({
        start: format(start, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`),
        end: format(end, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`),
        message,
        id
      })

      dispatch(fetchAllTasks([...taskList, ...newTask]))
    }
  }

  const handleSetTimes = (time: Date) => {
    setSelectedTimes({
      start: selectedTimes.start ?? time,
      end: selectedTimes.start ? time : selectedTimes.end
    })

    if (selectedTimes.end) {
      setSelectedTimes({
        start: time,
        end: null
      })
    }
  }

  const renderHours = (time: Date, index: number) => {
    return (
      <div className='daily-time' key={index} onClick={() => {
        if (eventMode) {
          handleSetTimes(time)
        }
      }}
      />
    );
  }

  const handleRemoveTask = (id: number | string) => {
    const updatedTasks = taskList.filter(i => i.id !== id)

    dispatch(fetchAllTasks([...updatedTasks]))
  }

  const renderTaskForDay = (d: any) => {
    const diferent = differenceInHours(parseISO(d.end), parseISO(d.start))
    const hoursStart = getHours(parseISO(d.start))

    return (
      <div className='daily-task' style={{ height: `${25 * diferent}px`, top: `${25 * hoursStart}px` }}>
        {d.message}
        <div className='remove-daily-task' onClick={() => handleRemoveTask(d.id)}>
          X
        </div>
      </div>
    )
  }

  const renderGrid = (date: Date) => {
    const tasksForDay = taskList.filter((task: any) => isSameDay(date, parseISO(task.start)) && isSameDay(date, parseISO(task.end)))

    const hours = eachHourOfInterval({
      start: date,
      end: addHours(date, 23)
    })

    return (
      <section className="calendar-week-grid">
        {hours.map((time: any, index: number) => renderHours(time, index))}
        {tasksForDay.map((task: Task) => renderTaskForDay(task))}
      </section>
    );
  }

  const renderDay = ({ dayName, date }: any, index: number) => {
    const cls = classnames("calendar-day", {
      "highlight": isSameDay(date, highlitedDate)
    });

    const currentTasks = taskList.filter((item: Task) => isSameDay(date, parseISO(item.start)))

    return (
      <div className='weekly-day-wrapper'>
        <div className={cls} key={`${index} ${dayName}`} onClick={() => {
          dispatch(changeSelectedDate(date))
          dispatch(fetchCurrentTasks(currentTasks))
          setHighlitedDate(date)
        }} >
          {dayName}
        </div>
        {renderGrid(date)}
      </div>
    );
  }

  const renderDays = () => {
    const t: any = props.t
    const result = eachDayOfInterval(week as any)
    const updatedDays = DAYS.map((day, i) => {
      const date = format(result[i], 'dd/MM')

      return {
        dayName: `${t(`days.${day}`)} (${date})`,
        date: result[i]
      }
    })


    return (
      <header className="calendar-days">
        {updatedDays.map((day, index) => renderDay(day, index))}
      </header>
    );
  }

  useEffect(handleSetAction, [selectedTimes])


  return (
    <article className='calendar'>
      {renderDays()}
    </article>
  )
}


const CalendarTranslated = withTranslation()(WeeklyCalendar as any);

export default CalendarTranslated