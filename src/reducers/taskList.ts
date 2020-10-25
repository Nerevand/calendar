
import { initialList } from 'invariants'
import {Task} from 'typedefs'

function taskListReducer(
  state = initialList,
  { type, payload }: any
): Task[] {
  if (type === "FETCH_TASKS") {
    localStorage.setItem('data', JSON.stringify([...payload] as Task[]))
    return payload;
  }
  return state;
}

export default taskListReducer;
