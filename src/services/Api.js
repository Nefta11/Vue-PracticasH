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
        const response = await axios.get(`${API_URL}/api/loans`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al obtener los préstamos');
    }
};

export const deleteLoan = async (loanId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/loans/${loanId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al eliminar el préstamo');
    }
};

export const createLoan = async (loan, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/loans/`, loan, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al crear el préstamo');
    }
};

export const updateLoan = async (loanId, loan, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/loans/${loanId}`, loan, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al actualizar el préstamo');
    }
};

export const createMaterial = async (material, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/materials/`, material, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al crear el material');
    }
};

export const updateMaterial = async (materialId, material, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/materials/${materialId}`, material, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al actualizar el material');
    }
};

export const deleteMaterial = async (materialId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/materials/${materialId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.detail || 'Error al eliminar el material');
    }
};
