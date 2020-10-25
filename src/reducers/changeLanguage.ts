function changeLanguage(
  state = "en",
  { type, payload }: any
): string | boolean {
  if (type === "CHANGE_LANGUAGE") {
    return payload;
  }
  return state;
}

export default changeLanguage;
