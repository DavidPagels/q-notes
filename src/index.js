import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from './providers/Auth0';
import { ApiProvider } from './providers/Api';
import config from './config.json';
import history from './utils/history';

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
	<Auth0Provider	
		domain={config.domain}
		client_id={config.clientId}
		redirect_uri={window.location.origin}
    audience={config.audience}
		onRedirectCallback={onRedirectCallback}>
    <ApiProvider apiHost={config.apiHost}>
  	  <App />
    </ApiProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

