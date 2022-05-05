import axios from 'axios';
import Cookies from 'js-cookie';
import isJSON from 'validator/lib/isJSON';

export function deleteAuthCredentials() {
	delete axios.defaults.headers.common.Authorization;
}

export function setAuthCredentials({ token }: { token: string }) {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function getAuthCredentials() {
	const userDetailsStringified = Cookies.get('ud');

	if (!userDetailsStringified) {
		return null;
	}

	return {
		token: Cookies.get('t'),
		user: isJSON(userDetailsStringified)
			? JSON.parse(userDetailsStringified)
			: null
	};
}
