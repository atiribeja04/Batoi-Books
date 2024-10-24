import data from './src/services/datos.js'; 
import Books from './src/model/books.class.js';
import Modules from './src/model/modules.class.js';
import Users from './src/model/users.class.js';

document.querySelector('#app').innerHTML = `
<header style="text-align: center; margin: 50px;">
  <img src="/logoBatoi.png" alt="Logo" width="100" />
  <h1>Mi Aplicación</h1>
  <p>Abre la consola para ver su funcionamiento</p>
</header>
`;

// Creamos las instancias de Modules, Users y Books y las llenamos con datos
const modules = new Modules();
const users = new Users();
const books = new Books();

// Poblar las instancias con los datos
users.populate(data.users);
books.populate(data.books);
modules.populate(data.modules);

// Mostramos los libros del usuario con ID 4
const userId = 4;
const userBooks = books.booksFromUser(userId); // Cambié Books.booksFromUser a books.booksFromUser
console.log(`Todos los libros del usuario ${userId}:`, userBooks);

// Mostramos los libros del módulo 5021 que están en buen estado
const moduleCode = '5021';
const moduleBooks = books.booksFromModule(moduleCode); // Cambié booksFromModule a books.booksFromModule
console.log(`Todos los libros del módulo ${moduleCode} en buen estado:`, moduleBooks);

// Incrementamos el precio de todos los libros en un 10% y los mostramos
const incrementPercentage = 0.10;
const updatedBooks = books.data.map(book => {
    book.price *= (1 + incrementPercentage);
    return book;
});
console.log(`Libros con precio incrementado en un 10%:`, updatedBooks);
