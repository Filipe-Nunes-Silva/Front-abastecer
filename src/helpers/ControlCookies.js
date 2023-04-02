import Cookies from "js-cookie";

export const loggedIn = (token) => {
    if (token) {
        Cookies.set('token', token, { expires: 1 });
        return;
    };

    return 'Token invalido!';
};

export const checkLogin = () => {
    let token = Cookies.get('token');
    return token !== undefined;
};

export const logout = () => {
    Cookies.remove('token');
};