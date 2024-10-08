import Book from './book.class';

class Books {
    constructor() {
        this.data = [];
    }

    populate(array) {
        this.data = array.map(valor => new Book(valor));
    }

    getBookById(bookId) {
        const book = this.data.find(b => b.id === bookId);
        if (!book) throw new Error(`Libro con ID ${bookId} no encontrado.`);
        return book;
    }

    getBookIndexById(bookId) {
        const index = this.data.findIndex(b => b.id === bookId);
        if (index === -1) throw new Error(`Libro con ID ${bookId} no encontrado.`);
        return index;
    }

    bookExists(userId, moduleCode) {
        return this.data.some(b => b.userId === userId && b.moduleCode === moduleCode);
    }
    
    booksFromUser(userId) {
        return this.data.filter(book => book.userId === userId);
    }
    

    booksFromModule(moduleCode) {
        return this.data.filter(book => book.moduleCode === moduleCode);
    }
    

    booksCheeperThan(price) {
        return this.data.filter(b => b.price <= price);
    }

    booksWithStatus(status) {
        return this.data.filter(b => b.status === status);
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) return '0.00 €';
        const total = this.data.reduce((acc, b) => acc + b.price, 0);
        const average = (total / this.data.length).toFixed(2);
        return `${average} €`;
    }

    booksOfTypeNotes() {
        return this.data.filter(b => b.publisher === 'Apunts');
    }

    booksNotSold() {
        return this.data.filter(b => b.soldDate === "");
    }

    incrementPriceOfbooks(valor) {
        this.data = this.data.map(b => ({ ...b, price: parseFloat((b.price * (1 + valor)).toFixed(1)) }));
    }

    addBook(bookData) {
        const newId = this.data.length > 0 ? Math.max(...this.data.map(book => book.id)) + 1 : 1;
        const newBook = new Book({ ...bookData, id: newId });
        this.data.push(newBook);
        return newBook;
    }

    removeBook(id) {
        const index = this.getBookIndexById(id);
        this.data.splice(index, 1);
    }

    changeBook(bookData) {
        const index = this.getBookIndexById(bookData.id);
        this.data[index] = new Book(bookData);
        return this.data[index]; // Retornar el libro modificado si es necesario
    }

    toString() {
        return this.data.map(book => book.toString()).join('\n');
    }
}

export default Books;
