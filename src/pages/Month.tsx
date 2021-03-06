import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { changeSelectedMonth } from "actions";
import { State } from "typedefs";
import { MONTHS_CON } from "invariants";

function Months() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state: State) => state.period.selectedMonth
  );
  const changeMonth = (month: number) => {
    dispatch(changeSelectedMonth(month));
  };

  const renderItem = (item: string, month: number) => {
    const cls = clsx("month", {
      active: month === selectedMonth,
    });

    return (
      <article className={cls} key={month} onClick={() => changeMonth(month)}>
        {t(`month.${item}`)}
      </article>
    );
  };

  return (
    <section className="months">
      {MONTHS_CON.map(renderItem)}
      <span className="indicator" />
    </section>
  );
}

export default Months;
