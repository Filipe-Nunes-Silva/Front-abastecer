import { checkLogin } from '../helpers/ControlCookies';

export const userInitalState = {
    isLogged: checkLogin(),
};

export const userReducer = (state, action) => {

    switch (action.type) {
        case 'CHANGE_LOGED':
            return { ...state, isLogged: action.payload.isLogged };
        default:
            return state;
    };
};