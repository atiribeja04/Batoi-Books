import Module from './module.class';
import { getDBModules, addDBModule, removeDBModule, changeDBModule } from '../services/modules.api';

class Modules {
    constructor() {
        this.data = [];
    }

    async populate() {
        try {
            const modules = await getDBModules();
            this.data = modules.map(m => new Module(m.code, m.cliteral, m.vliteral, m.courseId));
        } catch (error) {
            console.error('Error al poblar los módulos:', error);
        }
    }

    getModuleByCode(code) {
        const module = this.data.find(module => module.code === code);
        if (!module) throw new Error(`Módulo con código ${code} no encontrado.`);
        return module;
    }

    toString() {
        return this.data.map(module => module.toString()).join('\n');
    }

    async addModule(moduleData) {
        try {
            const newModule = await addDBModule(moduleData);
            this.data.push(new Module(newModule.code, newModule.cliteral, newModule.vliteral, newModule.courseId));
            return newModule;
        } catch (error) {
            console.error('Error al añadir el módulo:', error);
        }
    }

    async removeModule(code) {
        try {
            await removeDBModule(code);
            const index = this.data.findIndex(module => module.code === code);
            if (index === -1) throw new Error(`Módulo con código ${code} no encontrado.`);
            this.data.splice(index, 1);
        } catch (error) {
            console.error('Error al eliminar el módulo:', error);
        }
    }

    async changeModule(moduleData) {
        try {
            const updatedModule = await changeDBModule(moduleData);
            const index = this.data.findIndex(module => module.code === moduleData.code);
            if (index === -1) throw new Error(`Módulo con código ${moduleData.code} no encontrado.`);
            this.data[index] = new Module(updatedModule.code, updatedModule.cliteral, updatedModule.vliteral, updatedModule.courseId);
        } catch (error) {
            console.error('Error al modificar el módulo:', error);
        }
    }

    getAll() {
        return this.data;
    }
    
}

export default Modules;
