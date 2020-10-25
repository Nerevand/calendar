import {
  endOfWeek,
  startOfWeek,
} from 'date-fns'

type ActionProps = {
  type: string
  payload: {
    start: Date
    end: Date
  }
}

const initialState = {
  start: startOfWeek(new Date()),
  end: endOfWeek(new Date())
}

function setWeekReducer(
  state = initialState,
  action: ActionProps
) {
  const { type, payload } = action
  if (type === "SET_WEEK") {
    return payload;
  }
  return state;
}

export default setWeekReducer;
