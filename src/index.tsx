import React from 'react';
import createSagaMiddleware from "redux-saga";
import { render } from 'react-dom'
import { createStore, applyMiddleware, Store, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next"

import i18n from "i18n"
import { rootReducer } from "reducers";
import App from './App'
import { State } from 'typedefs'
import * as serviceWorker from './serviceWorker';

import './App.scss'
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const dynamicCompose: any =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose;

const store: Store<State> = createStore(
  rootReducer,
  dynamicCompose(applyMiddleware(sagaMiddleware))
);

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();