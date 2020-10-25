import { Task } from "typedefs";
import { FETCH_USER_TASKS } from "actions";

type ActionProps = {
  type: string;
  payload: Task[];
};

function fetchCurrentTasksReducer(state = [], action: ActionProps): Task[] {
  const { type, payload } = action;
  if (type === FETCH_USER_TASKS) {
    return payload;
  }
  return state;
}

export default fetchCurrentTasksReducer;
