import { 
  booksFromUser, 
  booksFromModule, 
  incrementPriceOfbooks 
} from './src/functions.js';

import data from './src/services/datos.js';

document.querySelector('#app').innerHTML = `
<header style="text-align: center; margin: 50px;">
  <img src="/logoBatoi.png" alt="Logo" width="100" />
  <h1>Mi Aplicación</h1>
  <p>Abre la consola para ver su funcionamiento</p>
</header>
`;

const userId = 4;
const moduleCode = '5021';
const incrementPercentage = 0.10;

const userBooks = booksFromUser(data.books, userId);
console.log(`Todos los libros del usuario ${userId}:`, userBooks);

const moduleBooks = booksFromModule(data.books, moduleCode).filter(b => b.status === 'good');
console.log(`Todos los libros del módulo ${moduleCode} en buen estado:`, moduleBooks);

const updatedBooks = incrementPriceOfbooks(data.books, incrementPercentage);
console.log(`Libros con precio incrementado en un 10%:`, updatedBooks);

