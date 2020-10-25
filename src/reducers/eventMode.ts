type ActionProps = {
  type: string;
  payload: boolean;
};

function eventMode(state = false, action: ActionProps): boolean {
  const { type, payload } = action;

  if (type === "CHANGE_EVENT_STATUS") {
    return payload;
  }
  return state;
}

export default eventMode;
