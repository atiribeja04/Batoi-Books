const getBookById = (books, bookId) => {
    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error(`Libro con ID ${bookId} no encontrado.`);
    return book;
};

const getBookIndexById = (books, bookId) => {
    const index = books.findIndex(b => b.id === bookId);
    if (index === -1) throw new Error(`Libro con ID ${bookId} no encontrado.`);
    return index;
};

const bookExists = (books, userId, moduleCode) => {
    return books.some(b => b.userId === userId && b.moduleCode === moduleCode);
};

const booksFromUser = (books, userId) => {
    return books.filter(b => b.userId === userId);
};

const booksFromModule = (books, moduleCode) => {
    return books.filter(b => b.moduleCode === moduleCode);
};

const booksCheeperThan = (books, price) => {
    return books.filter(b => b.price <= price);
};

const booksWithStatus = (books, status) => {
    return books.filter(b => b.status === status);
};

const averagePriceOfBooks = (books) => {
    if (books.length === 0) return '0.00 €';
    const total = books.reduce((acc, b) => acc + b.price, 0);
    const average = (total / books.length).toFixed(2);
    return `${average} €`;
};


const booksOfTypeNotes = (books) => {
    return books.filter(b => b.publisher === 'Apunts');
};

const booksNotSold = (books) => {
    return books.filter(b => b.soldDate == "");
};

const incrementPriceOfbooks = (books, percentage) => {
    return books.map(b => ({ ...b, price: parseFloat((b.price * (1 + percentage)).toFixed(1)) }));
};

const getUserById = (users, userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error(`Usuario con ID ${userId} no encontrado.`);
    return user;
};

const getUserIndexById = (users, userId) => {
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error(`Usuario con ID ${userId} no encontrado.`);
    return index;
};

const getUserByNickName = (users, nick) => {
    const user = users.find(u => u.nick === nick);
    if (!user) throw new Error(`Usuario con nick ${nick} no encontrado.`);
    return user;
};

const getModuleByCode = (modules, moduleCode) => {
    const module = modules.find(m => m.code === moduleCode);
    if (!module) throw new Error(`Módulo con código ${moduleCode} no encontrado.`);
    return module;
};

export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
};
