import Book from './book.class';
import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/books.api';

const NOTES = 'Apunts';

export default class Books {
    constructor() {
        this.data = [];
    }

    async populate() {
        try {
            const books = await getDBBooks();
            this.data = books.map(valor => new Book(valor));
        } catch (error) {
            console.error('Error al poblar los libros:', error);
        }
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
        return this.data.filter(b => b.publisher === NOTES);
    }

    booksNotSold() {
        return this.data.filter(b => b.soldDate === "");
    }

    async addBook(bookData) {
        try {
            const newBook = await addDBBook(bookData);
            this.data.push(new Book(newBook));
            return newBook;
        } catch (error) {
            console.error('Error al añadir el libro:', error);
            throw error;
        }
    }

    async removeBook(id) {
        try {
            await removeDBBook(id);
            const index = this.getBookIndexById(id);
            this.data.splice(index, 1);
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            throw error;
        }
    }

    async changeBook(bookData) {
        try {
            const updatedBook = await changeDBBook(bookData);
            const index = this.getBookIndexById(bookData.id);
            this.data[index] = new Book(updatedBook);
            return this.data[index];
        } catch (error) {
            console.error('Error al modificar el libro:', error);
            throw error;
        }
    }

    toString() {
        return this.data.map(book => book.toString()).join('\n');
    }
}
