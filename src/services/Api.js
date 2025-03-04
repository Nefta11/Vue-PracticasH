import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, user);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al crear el usuario');
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Correo electrónico o contraseña incorrectos');
    }
};
