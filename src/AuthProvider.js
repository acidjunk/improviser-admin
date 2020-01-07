import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from 'react-admin';
import apiUrl from "./Constants";

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            credentials: 'include',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                localStorage.setItem('authenticated', true);
                // Next lines are handy for token based login
                // return response.json()
            })
            // .then(({ response }) => {
            //     debugger;
            //     localStorage.setItem('token', response.user.authentication_token);
            // });
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('authenticated');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('authenticated');
            return Promise.reject();
        }
        return Promise.resolve();
    }



    return Promise.resolve();
}
