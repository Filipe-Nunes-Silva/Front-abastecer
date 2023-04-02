import Cookies from "js-cookie";
import axios from "axios";

const abastecer = axios.create({
    baseURL: 'http://localhost:5000',
});

export const publicApi = 'http://localhost:5000/public';

abastecer.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        let token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };
    };
    return config;
});

const DELETE = async (endPoint, body) => {
    try {
        const json = await abastecer.delete(endPoint, body);
        return json;
    }
    catch (error) {
        if (error.response.data.notallowed) {
            window.location.href = '/auth';
            return;
        }
        else {
            return { errors: error.response.data.errors };
        };
    };
};

const PUT = async (endPoint, body) => {
    try {
        const json = await abastecer.put(endPoint, body);
        return json;
    }
    catch (error) {
        if (error.response.data.notallowed) {
            window.location.href = '/auth';
            return;
        }
        else {
            return { errors: error.response.data.errors };
        };
    };
};

const POST = async (endPoint, body) => {

    try {
        const json = await abastecer.post(endPoint, body);
        return json;
    }
    catch (error) {

        if (error.response.data.notallowed) {
            window.location.href = '/auth';
            return;
        }
        else {
            return { errors: error.response.data.errors };
        };

    };
};

const GET = async (endPoint, params) => {
    try {
        const json = await abastecer.get(endPoint, params);
        return json;
    }
    catch (error) {
        if (error.response.data.notallowed) {
            window.location.href = '/auth';
            return;
        }
        else {
            // return { erros: error.response.data.erros };
            return { errors: error.response.data.errors };
        };
    };
};

export const api = {
    signIn: async (cpf, password) => {
        const json = await POST('/access', { cpf, password });
        return json;
    },
    getVehicles: async () => {
        const json = await GET('/vehicle');
        return json;
    },
    getFueling: async () => {
        const json = await GET('/fueling');
        return json;
    },
    getUsers: async () => {
        const json = await GET('/user');
        return json;
    },
};

