import Books from '../model/books.class.js';
import View from '../views/view.js';
import Modules from '../model/modules.class.js'; 

export default class Controller {
    constructor() {
        this.books = new Books();
        this.modules = new Modules();
        this.view = new View();
    }

    async init() {
        try {
            await this.modules.populate(); 
            this.view.renderModules(this.modules.getAll()); 

            await this.books.populate(); 
            this.books.getAll().forEach(book => this.view.renderNewBook(book)); 

            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
        } catch (error) {
            console.error('Error en la inicialización del controlador:', error);
            this.view.showMessage('error', 'Error en la inicialización');
        }
    }
    handleSubmitBook(payload) {
        console.log('Payload recibido:', payload); 
        if (!payload.title || payload.title.length < 5) {
            this.view.showMessage('error', 'El título es demasiado corto');
            return;
        }
    
        try {
            const newBook = this.books.addBook(payload); 
            console.log(newBook);
            this.view.renderNewBook(this.books.getBookIndexById);
            this.view.showMessage('info', 'Libro añadido correctamente');
        } catch (err) {
            this.view.showMessage('error', 'Error al añadir el libro');
        }
    }
    
    handleRemoveBook(id) {
        try {
            this.books.removeBook(id);
            this.view.renderRemovedBook(id);
        } catch (err) {
            this.view.showMessage('error', 'Error al eliminar el libro');
        }
    }
}
