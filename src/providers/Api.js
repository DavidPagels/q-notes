import React, { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

let API_HOST;
export const ApiContext = React.createContext();
export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children, apiHost }) => {
  API_HOST = apiHost;
  const [fetching, setFetching] = useState(false);
  const [userSettings, setUserSettings] = useState({});
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const getRequest = (path) => {
    path = isAuthenticated ? path : `/public${path}`;
    return apiRequest(path);
  };

  const postRequest = (path, body) => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    return apiRequest(path, opts);
  };

  const putRequest = (path, body) => {
    const opts = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    return apiRequest(path, opts);
  };

  const deleteRequest = path => {
    const opts = {
      method: 'DELETE'
    };
    return apiRequest(path, opts);
  };

  const apiRequest = async (path, opts = {}) => {
    setFetching(true);
    try {
      const token = await getAccessTokenSilently();
      opts.headers = { ...opts.headers, 'Authorization': `Bearer ${token}` };
    } catch (e) {
      console.log('caught auth error')
      // Allow unauthorized get requests
      if (opts.method) {
        throw e;
      }
    }

    let response;
    try {
      response = await fetch(`${API_HOST}${path}`, opts);
      if (response.status === 200) {
        return await response.json();
      }
    } catch (e) {
      console.error(JSON.stringify({ message: `Error making ${opts.method || 'GET'} ${path} request`, error: e ? e.message : {} }));
    } finally {
      setFetching(false);
    }
  };

  const updateUserSettings = async () => {
    await putRequest(`/userLogin`, user);
    const settings = await getRequest(`/users/settings`) || {};
    if (settings.theme) {
      localStorage.setItem('q-theme', settings.theme);
    }
    setUserSettings(settings);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      updateUserSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  return (
    <ApiContext.Provider
      value={{
        getRequest,
        putRequest,
        postRequest,
        deleteRequest,
        fetching,
        userSettings,
        updateUserSettings
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
