import React, { useEffect, useReducer } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { IntlProvider } from 'react-intl';
import { AppContext } from './contexts';
import { appInitialState, appReducer } from './reducers/state';
import { initDispatch, updateState } from './actions';
import enJson from './locales/en';
import zhJson from './locales/zh';
import esJson from './locales/es';
import frJson from './locales/fr';
import itJson from './locales/it';

const localeMap: Record<string, any> = {
  zh: zhJson,
  en: enJson,
  fr: frJson,
  it: itJson,
  es: esJson,
};

function App(): JSX.Element {
  const [appState, dispatch] = useReducer(appReducer, appInitialState);
  const selectedLocaleCode = appState.settings.selectedLocaleCode;
  useEffect(() => {
    updateState(appState);
  }, [appState]);
  useEffect(() => {
    initDispatch(dispatch);
    updateState(appState);
  }, []);
  return (
    <AppContext.Provider
      value={{
        dispatch,
        appState,
      }}
    >
      <IntlProvider
        locale={selectedLocaleCode}
        messages={localeMap[selectedLocaleCode]}
      >
        <RouterProvider router={router} />
      </IntlProvider>
    </AppContext.Provider>
  );
}

export default App;
