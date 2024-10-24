const API_URL = 'http://localhost:3000/books'; // Cambia esto por la URL de tu API

export const getDBBooks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error obteniendo libros: ${response.status}`);
    }
    return await response.json();
};

export const getDBBook = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Error obteniendo libro con id ${id}: ${response.status}`);
    }
    return await response.json();
};

export const addDBBook = async (book) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error(`Error añadiendo libro: ${response.status}`);
    }
    return await response.json();
};

export const removeDBBook = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Error eliminando libro con id ${id}: ${response.status}`);
    }
};

export const changeDBBook = async (book) => {
    const response = await fetch(`${API_URL}/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error(`Error modificando libro con id ${book.id}: ${response.status}`);
    }
    return await response.json();
};
