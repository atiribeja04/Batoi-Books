export default class View {
    constructor() {
        this.booksList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
        this.messages = document.getElementById('messages');

        if (!this.booksList || !this.form || !this.bookForm || !this.messages) {
            console.error('Error al cargar los elementos del DOM');
            return;
        }
    }

    renderModules(modules) {
        const moduleSelect = document.getElementById('id-module');
        moduleSelect.innerHTML = '<option>- Selecciona un módulo -</option>'; 

        modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.code;
            option.textContent = `${module.cliteral} (${module.code})`;
            moduleSelect.appendChild(option);
        });
    }

    renderNewBook(book) {
        const DOMBook = document.createElement('div');
        DOMBook.className = 'card';
        DOMBook.setAttribute('data-id', book.id);
        DOMBook.innerHTML = `
            <img src="Foto del Libro" alt="Libro: ${book.id}">
            <div>
                <h3>${book.title} (${book.id})</h3>
                <h4>${book.publisher}</h4>
                <p>${book.pages} páginas</p>
                <p>Estado: ${book.status}</p>
                <p>${book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'}</p>
                <p>${book.comments}</p>
                <h4>${book.price} €</h4>
            </div>`;
        this.booksList.appendChild(DOMBook);
    }

    renderRemovedBook(id) {
        const bookCard = this.booksList.querySelector(`div[data-id='${id}']`);
        if (bookCard) {
            bookCard.remove();
            this.showMessage('info', 'Libro eliminado correctamente');
        }
    }

    showMessage(type, message) {
        const DOMmessage = document.createElement('div');
        DOMmessage.className = `alert alert-${type === 'error' ? 'danger' : 'info'} alert-dismissible`;
        DOMmessage.setAttribute('role', 'alert');
        DOMmessage.innerText = message;

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.onclick = () => DOMmessage.remove();

        DOMmessage.appendChild(closeButton);
        this.messages.appendChild(DOMmessage);

        if (type !== 'error') {
            setTimeout(() => {
                DOMmessage.remove();
            }, 3000);
        }
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(this.bookForm);
            const payload = {
                title: formData.get('title'),
                price: formData.get('price'),
                pages: formData.get('pages'),
                comments: formData.get('comments'),
                moduleId: formData.get('id-module'), 
                status: formData.get('status'), 
            };
            callback(payload);
        });
    }

    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {
            const idToRemove = document.getElementById('id-remove').value;
            callback(idToRemove);
        });
    }
}
