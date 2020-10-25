import React from 'react'
import classnames from 'clsx'
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { changeSelectedMonth } from 'actions'
import { State } from 'typedefs'
import { MONTHS_CON } from 'invariants'


function Months() {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state: State) => state.period.selectedMonth)
  const changeMonth = (month: number) => {
    dispatch(changeSelectedMonth(month))
  }

  const renderItem = (item: string, month: number) => {
    const cls = classnames("month", {
      active: month === selectedMonth
    });

    return (
      <div
        className={cls}
        key={month}
        onClick={() => changeMonth(month)}
      >
        {t(`month.${item}`)}
      </div>
    );
  };

  return (
    <section className="months">
      {MONTHS_CON.map(renderItem)}
      <span className="indicator" />
    </section>
  );
}

export default Months