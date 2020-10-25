import React from 'react';
import { useSelector } from 'react-redux'

import ConnectedMonths from './pages/Month'
import ConnectedCalendar from './pages/Calendar'
import ConnectedTime from './pages/Time'
import ConnectedWeeklyCalendar from './pages/WeeklyCalendar'
import ConnectedDetail from './pages/Details'

import { State } from './typedefs'

import './App.scss';

function App() {
  const period = useSelector((state: State) => state.period.type)

  return (
    <div className="application">
      <article className="board">
        {
          period === 'month'
            ? (
              <>
                <ConnectedMonths />
                <ConnectedCalendar />
              </>
            )
            : (
              <>
                <ConnectedTime />
                <ConnectedWeeklyCalendar />
              </>
            )
        }
        <ConnectedDetail />
      </article>
    </div>
  );
}

export default App;
