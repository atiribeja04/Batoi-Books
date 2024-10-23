const API_URL = import.meta.env.VITE_URL_API + '/books';


export const getDBBooks = () => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('GET', API_URL, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error obteniendo libros: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const getDBBook = (id) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('GET', `${API_URL}/${id}`, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error obteniendo libro con id ${id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const addDBBook = (book) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('POST', API_URL, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 201) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error añadiendo libro: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify(book));
    });
};

export const removeDBBook = (id) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('DELETE', `${API_URL}/${id}`, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver();
            } else {
                rechazar(new Error(`Error eliminando libro con id ${id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const changeDBBook = (book) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('PUT', `${API_URL}/${book.id}`, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error modificando libro con id ${book.id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify(book));
    });
};
