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
            correoElectronico: user.email,
            contrasena: user.password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Correo electrónico o contraseña incorrectos');
    }
};

export const getMaterials = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/materials/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al obtener los materiales');
    }
};

export const getLoans = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/loans/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al obtener los préstamos');
    }
};
