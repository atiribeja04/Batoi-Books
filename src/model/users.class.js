import User from './user.class';
import { getDBUsers, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword } from '../services/users.api';

export default class Users {
    constructor() {
        this.data = [];
    }

    async populate() {
        try {
            const users = await getDBUsers();
            this.data = users.map(u => new User(u.id, u.nick, u.email, u.password));
        } catch (error) {
            console.error('Error al poblar los usuarios:', error);
        }
    }

    getUserById(id) {
        const user = this.data.find(user => user.id === id);
        if (!user) throw new Error(`Usuario con id ${id} no encontrado.`);
        return user;
    }

    getUserByNickName(nick) {
        const user = this.data.find(u => u.nick === nick);
        if (!user) throw new Error(`Usuario con nick ${nick} no encontrado.`);
        return user;
    }

    getUserIndexById(userId) {
        const index = this.data.findIndex(u => u.id === userId);
        if (index === -1) throw new Error(`Usuario con ID ${userId} no encontrado.`);
        return index;
    }

    toString() {
        return this.data.map(user => user.toString()).join('\n');
    }

    async addUser(userData) {
        try {
            const newUser = await addDBUser(userData);
            this.data.push(new User(newUser.id, newUser.nick, newUser.email, newUser.password));
            return newUser;
        } catch (error) {
            console.error('Error al añadir el usuario:', error);
            throw error;
        }
    }

    async removeUser(id) {
        try {
            await removeDBUser(id);
            const index = this.getUserIndexById(id);
            this.data.splice(index, 1);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            throw error;
        }
    }

    async changeUser(userData) {
        try {
            const updatedUser = await changeDBUser(userData);
            const index = this.getUserIndexById(userData.id);
            this.data[index] = new User(updatedUser.id, updatedUser.nick, updatedUser.email, updatedUser.password);
            return updatedUser;
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            throw error;
        }
    }

    async changeUserPassword(userId, newPassword) {
        try {
            await changeDBUserPassword(userId, newPassword);
            const user = this.getUserById(userId);
            user.password = newPassword; // Actualizamos la contraseña en la data local
        } catch (error) {
            console.error('Error al cambiar la contraseña del usuario:', error);
            throw error;
        }
    }

    getUserByEmail(email) {
        const user = this.data.find(u => u.email === email);
        if (!user) throw new Error(`Usuario con email ${email} no encontrado.`);
        return user;
    }

    userExists(id) {
        return this.data.some(u => u.id === id);
    }
}

