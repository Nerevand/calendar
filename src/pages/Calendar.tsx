import React from "react";
import classnames from "clsx";
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import {
  add,
  getDaysInMonth,
  getDay,
  lastDayOfMonth,
  addMonths,
  subMonths,
  differenceInWeeks,
  format,
  isSameDay,
  parseISO,
  getTime,
} from "date-fns";

import { changeSelectedDate, fetchCurrentTasks, fetchAllTasks } from "actions";

import { initialList, DAYS } from "invariants";
import { Task, State } from "typedefs";

type CalendarProps = {
  changeSelectedDate: any;
  fetchCurrentTasks: any;
  fetchAllTasks: any;
  eventMode: boolean;
  taskList: Task[];
  t?: Function;
};

type CalendarState = {
  year: any;
  month: any;
  selectedDate: any;
  dates: any[];
  selectedDates: any;
};

class Calendar extends React.Component<CalendarProps, CalendarState> {
  static defaultProps = {
    changeSelectedDate: () => null,
  };
  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      year: null,
      month: null,
      selectedDate: null,
      dates: [],
      selectedDates: {
        start: null,
        end: null,
      },
    };
  }

  componentDidMount() {
    const dataFromStorage: string | null = localStorage.getItem("data");
    const parsedData = JSON.parse(dataFromStorage as string);

    this.props.fetchAllTasks(parsedData ?? initialList);
  }

  static makeMonthDates = (props: any) => {
    const { year, month } = props;
    const preDates = [];
    const dates = [];
    const nextDates = [];

    const preMonth = subMonths(new Date(year, month), 1);
    const preMonthLastDate = lastDayOfMonth(preMonth);
    let preMonthDayOffset = getDay(preMonthLastDate);

    while (preMonthDayOffset >= 0 && preMonthDayOffset < 6) {
      preDates.push({
        inMonth: false,
        date: new Date(
          `${preMonthLastDate.getFullYear()}-${
            preMonthLastDate.getMonth() + 1
          }-${preMonthLastDate.getDate() - preMonthDayOffset}`
        ),
      });
      preMonthDayOffset--;
    }

    const totalDaysInCurrentMonth = getDaysInMonth(new Date(year, month));
    const currentMonthLastDate = new Date(
      `${year}-${month + 1}-${totalDaysInCurrentMonth}`
    );

    for (let day = 1; day < totalDaysInCurrentMonth + 1; day++) {
      dates.push({
        inMonth: true,
        date: new Date(`${year}-${month + 1}-${day}`),
      });
    }

    const nextMonth = addMonths(new Date(year, month), 1);
    const nextMonthFirstDate = new Date(nextMonth.setDate(1));
    let nextMonthDayOffset = 6 - getDay(currentMonthLastDate);
    for (let i = 0; i < nextMonthDayOffset; i++) {
      nextDates.push({
        inMonth: false,
        date: new Date(
          `${nextMonthFirstDate.getFullYear()}-${
            nextMonthFirstDate.getMonth() + 1
          }-${nextMonthFirstDate.getDate() + i}`
        ),
      });
    }

    return [...preDates, ...dates, ...nextDates];
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.year !== prevState.year ||
      nextProps.month !== prevState.month ||
      nextProps.selectedDate !== prevState.selectedDate
    ) {
      return {
        year: nextProps.year,
        month: nextProps.month,
        selectedDate: nextProps.selectedDate,
        dates: Calendar.makeMonthDates(nextProps),
      };
    }
    return null;
  }

  handleSetAction = () => {
    const { selectedDates } = this.state;
    let { start, end } = selectedDates;

    if (start && end) {
      const { taskList, fetchAllTasks } = this.props;
      const message = prompt("task", "");
      const newTask: Task[] = [];
      const id = getTime(new Date());

      if (!message) {
        return;
      }

      if (start > end) {
        let temporary = start;
        start = end;
        end = temporary;
        temporary = null;
      }

      while (start <= end) {
        newTask.push({
          start: format(start, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`),
          message,
          id,
        });
        start = add(start, { days: 1 });
      }

      fetchAllTasks([...taskList, ...newTask]);
    }
  };

  handleSetDates = (d: Date) => {
    const { selectedDates } = this.state;

    this.setState(
      {
        selectedDates: {
          start: selectedDates.start ?? d,
          end: selectedDates.start ? d : selectedDates.end,
        },
      },
      this.handleSetAction
    );

    if (selectedDates.end) {
      this.setState({
        selectedDates: {
          start: d,
          end: null,
        },
      });
    }
  };

  renderDate(dateObj: any, ind: number) {
    const { t }: any = this.props;
    const {
      changeSelectedDate,
      eventMode,
      fetchCurrentTasks,
      taskList,
    } = this.props;
    const { selectedDate } = this.state;
    const { date, inMonth } = dateObj;
    const cls = classnames("calendar-date", {
      "in-month": inMonth,
      highlight: inMonth && isSameDay(date, new Date(selectedDate)),
    });

    const currentTasks = taskList.filter((item: Task) =>
      isSameDay(date, parseISO(item.start))
    );

    return (
      <div
        className={cls}
        key={ind}
        onClick={() => {
          if (eventMode) {
            this.handleSetDates(date);
          } else {
            fetchCurrentTasks(currentTasks);
          }
          changeSelectedDate(date);
        }}
      >
        {format(date, "dd")} <br />
        {currentTasks.length ? `${currentTasks.length} ${t("taskHere")}` : null}
      </div>
    );
  }

  renderDay(day: string) {
    return (
      <div className="calendar-day" key={day}>
        {day}
      </div>
    );
  }
  renderDays() {
    const { t }: any = this.props;
    const updatedDAys = DAYS.map((d) => `${t(`days.${d}`)}`);
    return (
      <header className="calendar-days">
        {updatedDAys.map((day) => this.renderDay(day))}
      </header>
    );
  }

  renderGrid() {
    return (
      <section className="calendar-grid">
        {this.state.dates.map((date, ind) => this.renderDate(date, ind))}
      </section>
    );
  }

  render() {
    const { dates } = this.state;
    const weeks = differenceInWeeks(
      dates[dates.length - 1].date,
      dates[0].date
    );

    const cls = classnames("calendar", `calendar-${weeks}-weeks`);

    return (
      <article className={cls}>
        {this.renderDays()}
        {this.renderGrid()}
      </article>
    );
  }
}

const ConnectedCalendar = connect(
  (state: State) => {
    return {
      year: new Date().getFullYear(),
      month: state.period.selectedMonth,
      selectedDate: state.period.selectedDate,
      eventMode: state.eventMode,
      taskList: state.taskList,
    };
  },
  (dispatch) => ({
    changeSelectedDate: (date: any) => {
      dispatch(changeSelectedDate(date));
    },
    fetchCurrentTasks: (tasks: Task[]) => {
      dispatch(fetchCurrentTasks(tasks));
    },
    fetchAllTasks: (tasks: Task[]) => {
      dispatch(fetchAllTasks(tasks));
    },
  })
)(Calendar);

const CalendarTranslated = withTranslation()(ConnectedCalendar);

export default CalendarTranslated;
