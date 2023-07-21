import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApiProvider } from './providers/Api';
import config from './config.json';
import history from './utils/history';

const onRedirectCallback = appState => {
  history.push(appState?.returnTo || window.location.pathname);
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    authorizationParams={{ audience: config.audience, redirect_uri: window.location.origin }}
    onRedirectCallback={onRedirectCallback}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ApiProvider apiHost={config.apiHost}>
      <App />
    </ApiProvider>
  </Auth0Provider>
);

