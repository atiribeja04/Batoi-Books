import User from './user.class';

class Users {
    constructor() {
        this.data = [];
    }

    populate(array) {
        this.data = array.map(valor => new User(valor.id, valor.nick, valor.email, valor.password));
    }

    getUserById(id) {
        const user = this.data.find(user => user.id === id);
        if (!user) throw new Error(`Usuario con id ${id} no encontrado.`);
        return user;
    }

    getUserByNickName(nick){
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

    addUser(userData) {
        const auxUltimoUser = Math.max(...this.data.map(user => user.id)) + 1;
        const newUser = new User(auxUltimoUser, userData.nick, userData.email, userData.password);
        this.data.push(newUser);
        return newUser;
    }

    removeUser(id) {
        const index = this.getUserIndexById(id);
        this.data.splice(index, 1);
    }

    changeUser(userData) {
        const index = this.getUserIndexById(userData.id);
        const newUser = new User(userData.id, userData.nick, userData.email, userData.password);
        this.data[index] = newUser;
        return newUser;
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

export default Users;
