const API_URL = `${process.env.VITE_URL_API}/users`;

export const getDBUsers = () => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('GET', API_URL, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error obteniendo usuarios: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const getDBUser = (id) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('GET', `${API_URL}/${id}`, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error obteniendo usuario con id ${id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const addDBUser = (user) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('POST', API_URL, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 201) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error añadiendo usuario: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify(user));
    });
};

export const removeDBUser = (id) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('DELETE', `${API_URL}/${id}`, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver();
            } else {
                rechazar(new Error(`Error eliminando usuario con id ${id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const changeDBUser = (user) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('PUT', `${API_URL}/${user.id}`, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error modificando usuario con id ${user.id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify(user));
    });
};

export const changeDBUserPassword = (id, nuevaPassword) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('PATCH', `${API_URL}/${id}`, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error modificando contraseña de usuario con id ${id}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify({ password: nuevaPassword }));
    });
};
