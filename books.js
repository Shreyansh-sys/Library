const myLibrary = [];
class Book {
    constructor(title, author, noOfPages, read) {
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.read = read;
    }
    info () {
        let hasRead;
        if (this.read === true) {
            hasRead = "read";
        }
        else hasRead = "not red yet";

        return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${hasRead}`;
    }
}

function Book(title, author, noOfPages, read) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = read;
    this.info = function () {
        let hasRead;
        if (this.read === true) {
            hasRead = "read";
        }
        else hasRead = "not red yet";

        return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${hasRead}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderBooks();
}

function renderBooks() {

    const bookContainer = document.querySelector('.books');
    bookContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card')
        bookCard.innerHTML = `
        <h3 class="book-title" style="font-weight: bolder;">${book.title}</h3>
        <p class="author"><em>by ${book.author}</em></p>
        <p class="pages">${book.noOfPages} pages</p>
        <button class="delete-button">Delete</button>
        <button class="read-button">Not read yet</button>`;

        const deleteButton = bookCard.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteBook(book);
            renderBooks();
        });


        const readButton = bookCard.querySelector('.read-button');
        readButton.addEventListener('click', () => {
            console.log(readButton.textContent);
            if (readButton.textContent === 'Not read yet') {
                book.read = true;
                readButton.textContent = 'Read';
            }
            else {
                readButton.textContent = 'Not read yet';
                book.read = false;
            }
            // renderBooks();
        });

        bookContainer.appendChild(bookCard);
    });

}

function deleteBook(book) {
    const bookIndex = myLibrary.findIndex(b => b.title === book.title);
    if (bookIndex != -1) {
        myLibrary.splice(bookIndex, 1);
    }
    else console.log("Book not found!");
}

document.getElementById('submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('author-name').value;
    const pages = document.getElementById('pages').value;
    // const read = document.getElementById('read-status').checked;

    const newBook = new Book(title, author, pages);
    addBookToLibrary(newBook);

    // document.getElementById('book-form').reset();
});

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 260, false);
const book2 = new Book("Lord of the Rings", "J.R.R Tolkien", "1137", true);
const book3 = new Book("The Hobbit", "J.R.R. Tolkien", 260, false);
const book4 = new Book("The Hobbit", "J.R.R. Tolkien", 260, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);


