import {Task} from 'typedefs'

function fetchCurrentTasksReducer(
  state = [],
  { type, payload }: any
): Task[] {
  if (type === "FETCH_USER_TASKS") {
    return payload;
  }
  return state;
}

export default fetchCurrentTasksReducer;
