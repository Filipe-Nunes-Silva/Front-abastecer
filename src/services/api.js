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
            window.location.href = '/acess';
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
            window.location.href = '/acess';
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
            window.location.href = '/acess';
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
            window.location.href = '/acess';
            return;
        }
        else {
            return { errors: error.response.data.errors };
        };
    };
};

export const api = {
    signIn: async (cpf, password) => {
        const json = await POST('/access', { cpf, password });
        return json;
    },
    newVehicle: async (data) => {
        const json = await POST('/vehicle', data);
        return json;
    },

    getVehicles: async () => {
        const json = await GET('/vehicle');
        return json;
    },
    getVehicle: async (id) => {
        const json = await GET(`/vehicle/${id}`);
        return json;
    },
    editVehicle: async (id, data) => {
        const json = await PUT(`/vehicle/${id}`, data);
        return json;
    },
    deleteVehicle: async (id) => {
        const json = await DELETE(`/vehicle/${id}`);
        return json;
    },
    newFueling: async (data) => {
        const json = await POST('/fueling', data);
        return json;
    },
    getFuelings: async () => {
        const json = await GET('/fueling');
        return json;
    },
    getFueling: async (id) => {
        const json = await GET(`/fueling/${id}`);
        return json;
    },
    editFueling: async (id, data) => {
        const json = await PUT(`/fueling/${id}`, data);
        return json;
    },
    deleteFueling: async (id) => {
        const json = await DELETE(`/fueling/${id}`);
        return json;
    },
    newUser: async (data) => {
        const json = await POST('/user', data);
        return json;
    },
    getUsers: async () => {
        const json = await GET('/user');
        return json;
    },
    getUser: async (id) => {
        const json = await GET(`/user/${id}`);
        return json;
    },
    editUser: async (data) => {
        const json = await PUT(`/user`, data);
        return json;
    },
    getIdUser: async () => {
        const json = await GET('/user/getid');
        return json;
    },
    deleteUser: async () => {
        const json = await DELETE(`/user`);
        return json;
    },
    initialUser: async (data) => {
        const json = await POST('/initialuser', data);
        return json;
    },
};

