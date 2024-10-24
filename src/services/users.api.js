const API_URL = 'http://localhost:3000/users';

export const getDBUsers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error obteniendo usuarios: ${response.status}`);
    }
    return await response.json();
};

export const getDBUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Error obteniendo usuario con id ${id}: ${response.status}`);
    }
    return await response.json();
};

export const addDBUser = async (user) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error(`Error añadiendo usuario: ${response.status}`);
    }
    return await response.json();
};

export const removeDBUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Error eliminando usuario con id ${id}: ${response.status}`);
    }
};

export const changeDBUser = async (user) => {
    const response = await fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error(`Error modificando usuario con id ${user.id}: ${response.status}`);
    }
    return await response.json();
};

export const changeDBUserPassword = async (id, nuevaPassword) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: nuevaPassword })
    });
    if (!response.ok) {
        throw new Error(`Error modificando contraseña de usuario con id ${id}: ${response.status}`);
    }
    return await response.json();
};
