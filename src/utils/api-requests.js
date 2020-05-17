import { getTokenSilently } from "../react-auth0-spa";

const API_HOST = 'http://localhost:8080'

const ApiRequests = async (path, body = {}) => {
	const token = await getTokenSilently();

	body.headers = {...body.headers, 'Authorization': `Bearer ${token}`};
	let response;
	try {
		response = await fetch(`${API_HOST}${path}`, body);
		return await response.json();
	} catch (e) {
		console.error(JSON.stringify({message: 'Error making request', error: e}));
	}
}

export default ApiRequests;