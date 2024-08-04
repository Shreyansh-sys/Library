const myLibrary = [];
const book_title = document.getElementById("book-title");
const book_author = document.getElementById("author-name");
const book_pages = document.getElementById("pages");

class Book {
  constructor(title, author, noOfPages, read) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = read;
  }
  info() {
    let hasRead;
    if (this.read === true) {
      hasRead = "read";
    } else hasRead = "not red yet";

    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${hasRead}`;
  }
}

function showError() {
  if (book_title.validity.valueMissing) {
    title_error.textContent = "You need to enter the name of the book";
    console.log(title_error);
  } else if (book_author.validity.valueMissing) {
    author_error.textContent = "You need to enter the author's name";
  } else if (book_pages.validity.valueMissing) {
    pages_error.textContent = "You need to enter the number of pages";
} else if (book_pages.validity.rangeUnderflow) {
    pages_error.textContent = "A book must have atleast 10 pages";
  }
}

const title_error = document.querySelector("#book-title + span.error");
const author_error = document.querySelector("#author-name + span.error");
const pages_error = document.querySelector("#pages + span.error");

book_title.addEventListener("input", (event) => {
  if (!book_title.validity.valid) {
    showError();
  } else {
    title_error.textContent = "";
  }
});

book_author.addEventListener("input", (event) => {
  if (!book_author.validity.valid) {
    showError();
  } else {
    author_error.textContent = "";
  }
});

book_pages.addEventListener("input", (event) => {
  if (!book_pages.validity.valid) {
    showError();
  } else {
    pages_error.textContent = "";
  }
});

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderBooks();
}

function renderBooks() {
  const bookContainer = document.querySelector(".books");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <h3 class="book-title" style="font-weight: bolder;">${book.title}</h3>
        <p class="author"><em>by ${book.author}</em></p>
        <p class="pages">${book.noOfPages} pages</p>
        <button class="delete-button">Delete</button>
        <button class="read-button">Not read yet</button>`;

    const deleteButton = bookCard.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteBook(book);
      renderBooks();
    });

    const readButton = bookCard.querySelector(".read-button");
    readButton.addEventListener("click", () => {
      console.log(readButton.textContent);
      if (readButton.textContent === "Not read yet") {
        book.read = true;
        readButton.textContent = "Read";
      } else {
        readButton.textContent = "Not read yet";
        book.read = false;
      }
      // renderBooks();
    });

    bookContainer.appendChild(bookCard);
  });
}

function deleteBook(book) {
  const bookIndex = myLibrary.findIndex((b) => b.title === book.title);
  if (bookIndex != -1) {
    myLibrary.splice(bookIndex, 1);
  } else console.log("Book not found!");
}

document.getElementById("submit-button").addEventListener("click", (event) => {
    event.preventDefault();
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("author-name").value;
  const pages = document.getElementById("pages").value;

  if (
    !book_title.validity.valid ||
    !book_pages.validity.valid ||
    !book_author.validity.valid
  ) {
    showError();
    event.preventDefault();
  } else {
    const newBook = new Book(title, author, pages);
    addBookToLibrary(newBook);
  }
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
