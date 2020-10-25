function eventMode(
  state = false,
  { type, payload }: any
): string | boolean {
  if (type === "CHANGE_EVENT_STATUS") {
    return payload;
  }
  return state;
}

export default eventMode;
