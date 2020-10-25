import { CHANGE_LANGUAGE } from "actions";

const initialState: string = localStorage.getItem("language") || "en";

type ActionProps = {
  type: string;
  payload: string;
};

function changeLanguage(
  state = initialState,
  action: ActionProps
): string | boolean {
  const { type, payload } = action;

  if (type === CHANGE_LANGUAGE) {
    return payload;
  }
  return state;
}

export default changeLanguage;
