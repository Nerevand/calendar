import React, { useState } from 'react'
import i18n from "i18next";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next";
import {
  addWeeks,
  format,
  differenceInDays,
  lastDayOfYear,
  startOfWeek,
  endOfWeek,
  startOfToday,
} from 'date-fns';

import {
  changeLanguage,
  changeEventStatus,
  changePeriodType,
  fetchAllTasks,
  setWeek,
  fetchCurrentTasks,
} from 'actions'
import Select from 'components/ui/Select'
import { Languages, periods } from 'invariants'
import { Task, State } from 'typedefs'

type DetailProps = {
  selectedDate: any,
  tasks: Task[],
  taskList: Task[],
  week: any,
  selectedPeriod: string
  language: string
}

function Detail(props: DetailProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { selectedDate, tasks, selectedPeriod, language } = props;
  const [period, setPeriod] = useState<string>(selectedPeriod);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setPeriod(event.target.value);
    dispatch(changePeriodType({ type: event.target.value }))

  };
  const remaind = differenceInDays(lastDayOfYear(selectedDate), selectedDate);
  const year = new Date(selectedDate).getFullYear();

  const handleChangeLanguage = (lang: string) => {
    localStorage.setItem("language", lang)
    dispatch(changeLanguage(lang))
    i18n.changeLanguage(lang)
  }

  const handleEventStatus = (e: React.ChangeEvent<any>) => {
    dispatch(changeEventStatus(e.target.checked))
  }

  const handleRemoveTasks = (id: number | string) => {
    const { taskList, tasks } = props;
    const updatedTasks = taskList.filter(i => i.id !== id)
    const updatedCurrentTasks = tasks.filter(i => i.id !== id)

    dispatch(fetchAllTasks([...updatedTasks]))
    dispatch(fetchCurrentTasks([...updatedCurrentTasks]))
  }

  const handleSetWeek = (amount: number) => {
    const { week } = props;
    const newWeekStartFrom = addWeeks(week.start, amount)

    dispatch(setWeek({ start: newWeekStartFrom, end: endOfWeek(newWeekStartFrom) }))
  }

  const handleSetWeekFromToday = () => {
    const today = startOfToday()

    dispatch(setWeek({ start: startOfWeek(today), end: endOfWeek(today) }))
  }

  return (
    <section className="detail">
      <div className='language-wrapper'>
        {Languages.map(i => (
          <div
            className={language === i ? "language active-language" : 'language'}
            key={i}
            onClick={() => handleChangeLanguage(i)}>{i}</div>
        ))}
      </div>

      {
        selectedPeriod === 'week' && (
          <div className='weekly-btn-wrapper'>
            <div className='week-changer today' onClick={handleSetWeekFromToday}>{t("today")}</div>
            <div className='week-changer arrows' onClick={() => handleSetWeek(-1)}>{'<'}</div>
            <div className='week-changer arrows' onClick={() => handleSetWeek(1)}>{">"}</div>
          </div>
        )
      }

      <Select data={periods} value={period} handleChange={handleChange} />

      <input type="checkbox" onChange={handleEventStatus} />
      <label>{t("eMode")}</label>
      <div>
        <h3 className="date-string">
          {format(selectedDate, "MMM，Do")}
        </h3>
        <p className="remaind">
          {remaind} {t("daysToNR")} {year}
        </p>
      </div>
      <br />

      <section>
        <h3> {t("selectedTaskTitle")}</h3>
        <div style={{ overflowY: 'auto', height: '200px' }}>
          {
            tasks.map((i: Task, index: number) => (
              <div key={i.id} className='task-detail-block'>
                <span>
                  {index + 1} {". "} {i.message}
                </span>
                <span className='remove-task' onClick={() => handleRemoveTasks(i.id)}>X</span>
              </div>
            ))
          }
        </div>
      </section>
    </section >
  );
}

const ConnectedDetail = connect((state: State) => ({
  selectedDate: state.period.selectedDate,
  tasks: state.currentTasks,
  taskList: state.taskList,
  selectedPeriod: state.period.type,
  week: state.week,
  language: state.lang,
}))(Detail);

export default ConnectedDetail