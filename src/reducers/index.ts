import { combineReducers } from "redux";

import lang from "./changeLanguage";
import selectedMonth from "./selectedMonth";
import eventMode from './eventMode'
import currentTasks from './currentTasks'
import taskList from './taskList'
import setWeekReducer from './week'

export const rootReducer = combineReducers({
  lang,
  period: selectedMonth,
  week: setWeekReducer,
  eventMode,
  currentTasks,
  taskList
});
