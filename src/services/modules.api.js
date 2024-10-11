const API_URL = `${process.env.VITE_URL_API}/modules`;

export const getDBModules = () => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('GET', API_URL, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error obteniendo módulos: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const getDBModule = (code) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('GET', `${API_URL}/${code}`, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error obteniendo módulo con código ${code}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const addDBModule = (module) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('POST', API_URL, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 201) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error añadiendo módulo: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify(module));
    });
};

export const removeDBModule = (code) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('DELETE', `${API_URL}/${code}`, true);
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver();
            } else {
                rechazar(new Error(`Error eliminando módulo con código ${code}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send();
    });
};

export const changeDBModule = (module) => {
    return new Promise((resolver, rechazar) => {
        const solicitud = new XMLHttpRequest();
        solicitud.open('PUT', `${API_URL}/${module.code}`, true);
        solicitud.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        solicitud.onload = function () {
            if (solicitud.status === 200) {
                resolver(JSON.parse(solicitud.responseText));
            } else {
                rechazar(new Error(`Error modificando módulo con código ${module.code}: ${solicitud.status}`));
            }
        };
        solicitud.onerror = () => rechazar(new Error('Error de red'));
        solicitud.send(JSON.stringify(module));
    });
};
