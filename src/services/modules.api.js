const API_URL = 'http://localhost:3000/modules';

export const getDBModules = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error obteniendo módulos: ${response.status}`);
    }
    return await response.json();
};

export const getDBModule = async (code) => {
    const response = await fetch(`${API_URL}/${code}`);
    if (!response.ok) {
        throw new Error(`Error obteniendo módulo con código ${code}: ${response.status}`);
    }
    return await response.json();
};

export const addDBModule = async (module) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(module)
    });
    if (!response.ok) {
        throw new Error(`Error añadiendo módulo: ${response.status}`);
    }
    return await response.json();
};

export const removeDBModule = async (code) => {
    const response = await fetch(`${API_URL}/${code}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Error eliminando módulo con código ${code}: ${response.status}`);
    }
};

export const changeDBModule = async (module) => {
    const response = await fetch(`${API_URL}/${module.code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(module)
    });
    if (!response.ok) {
        throw new Error(`Error modificando módulo con código ${module.code}: ${response.status}`);
    }
    return await response.json();
};
