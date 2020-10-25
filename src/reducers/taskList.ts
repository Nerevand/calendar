import { initialList } from "invariants";
import { Task } from "typedefs";
import { FETCH_TASKS } from "actions";

type ActionProps = {
  type: string;
  payload: Task[];
};

function taskListReducer(state = initialList, action: ActionProps): Task[] {
  const { type, payload } = action;
  if (type === FETCH_TASKS) {
    localStorage.setItem("data", JSON.stringify([...payload] as Task[]));
    return payload;
  }
  return state;
}

export default taskListReducer;
