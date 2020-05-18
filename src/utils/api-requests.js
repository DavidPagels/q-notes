import { getTokenSilently } from "../react-auth0-spa";

const API_HOST = 'http://localhost:8080'

export const getApiRequest = (path) => {
	return apiRequest(path);
};

export const postApiRequest = (path, body) => {
	const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };
	return apiRequest(path, opts);
};

export const putApiRequest = (path, body) => {
	const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };
	return apiRequest(path, opts);
};

export const deleteApiRequest = (path) => {
	const opts = {
    method: 'DELETE'
  };
	return apiRequest(path, opts);
};

export const apiRequest = async (path, opts = {}) => {
	const token = await getTokenSilently();

	opts.headers = {...opts.headers, 'Authorization': `Bearer ${token}`};
	let response;
	try {
		response = await fetch(`${API_HOST}${path}`, opts);
		if (response.status === 200) {
			return await response.json();
		}
	} catch (e) {
		console.error(JSON.stringify({message: `Error making ${opts.method || 'GET'} ${path} request`, error: e ? e.message : {}}));
	}
}
