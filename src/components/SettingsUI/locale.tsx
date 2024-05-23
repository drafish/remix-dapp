import { FormattedMessage } from 'react-intl';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts';

const localeMap: Record<string, string> = {
  zh: 'Chinese Simplified - 简体中文',
  en: 'English - English',
  fr: 'French - Français',
  it: 'Italian - Italiano',
  es: 'Spanish - Español',
};

export function LocaleUI() {
  const { appState, dispatch } = useContext(AppContext);
  const { selectedLocaleCode } = appState.settings;
  const localeCodeList = Object.keys(localeMap);

  useEffect(() => {
    const defaultLocaleCode =
      localStorage.getItem('selectedLocaleCode') || 'en';
    setLocaleCode(defaultLocaleCode);
  }, []);

  const setLocaleCode = (localeCode: string) => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: { selectedLocaleCode: localeCode },
    });
    localStorage.setItem('selectedLocaleCode', localeCode);
  };

  return (
    <div className="udapp_crow border-top mt-4">
      <label className="udapp_settingsLabel">
        <FormattedMessage id="udapp.locales" />
      </label>
      <div className="udapp_account">
        <select
          id="txorigin"
          data-id="runTabSelectAccount"
          name="txorigin"
          className="form-control udapp_select custom-select pr-4"
          value={selectedLocaleCode || localeCodeList[0]}
          onChange={(e) => {
            setLocaleCode(e.target.value);
          }}
        >
          {localeCodeList.map((localeCode) => (
            <option value={localeCode} key={localeCode}>
              {localeMap[localeCode]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
