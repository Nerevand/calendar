import { CHANGE_MONTH, CHANGE_DATE, CHANGE_TYPE } from "actions";

type ActionProps = {
  type: string;
  payload: {
    selectedMonth: number;
    selectedDate: Date;
    type: string;
  };
};

const initialState = {
  selectedMonth: new Date().getMonth(),
  selectedDate: new Date(),
  type: "month",
};

const selectedDate = (state = initialState, action: ActionProps) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_MONTH:
      return {
        ...state,
        selectedMonth: payload.selectedMonth,
      };
    case CHANGE_DATE:
      const month = new Date(payload.selectedDate).getMonth();

      return {
        ...state,
        selectedMonth: month,
        selectedDate: payload.selectedDate,
      };
    case CHANGE_TYPE:
      return {
        ...state,
        type: payload.type,
      };
    default:
      return state;
  }
};

export default selectedDate;
