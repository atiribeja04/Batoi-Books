import Module from './module.class';

class Modules {
    constructor() {
        this.data = [];
    }

    populate(array) {
        this.data = array.map(m => new Module(m.code, m.cliteral, m.vliteral, m.courseId));
    }

    getModuleByCode(code) {
        const module = this.data.find(module => module.code === code);
        if (!module) throw new Error(`Módulo con código ${code} no encontrado.`);
        return module;
    }

    toString() {
        return this.data.map(module => module.toString()).join('\n');
    }

    addModule(moduleData) {
        const newModule = new Module(moduleData.code, moduleData.cliteral, moduleData.vliteral, moduleData.courseId);
        this.data.push(newModule);
        return newModule;
    }

    removeModule(code) {
        const index = this.data.findIndex(module => module.code === code);
        if (index === -1) throw new Error(`Módulo con código ${code} no encontrado.`);
        this.data.splice(index, 1);
    }

    changeModule(moduleData) {
        const index = this.data.findIndex(module => module.code === moduleData.code);
        if (index === -1) throw new Error(`Módulo con código ${moduleData.code} no encontrado.`);
        this.data[index] = new Module(moduleData.code, moduleData.cliteral, moduleData.vliteral, moduleData.courseId);
    }
}

export default Modules;
