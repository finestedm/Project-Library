var myLibrary = [];

var grid = document.querySelector('.grid');
var newBookFormSwitch = document.getElementById('add-new-book');
var newBookForm = document.getElementById('new-book-details');
var editBookForm = document.getElementById('edit-book-details');
var titleInput = document.querySelector(`input[id=title]`);
var authorInput = document.querySelector(`input[id=author]`);
var pagesInput = document.querySelector(`input[id=pages]`);
var readPagesInput = document.querySelector(`input[id=readPages]`);
var isReadYes = document.querySelector(`label[for='isReadYes']`);
var isReadNo = document.querySelector(`label[for='isReadNo']`);
var submitNewBookButton = document.querySelector('#submit-new-book-button');
var dataset = 0

function generateNewBookNumber() {
    return dataset++;
}

function Book(title, author, pages, readPages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readPages = readPages;
    this.isRead = isRead;
    this.dataset = generateNewBookNumber();
}

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
    addBookToHTML(this);

};

function compareBooks(toDeleteBookDataset, currentBookDataset) {
    if (
        toDeleteBookDataset !== currentBookDataset
    ) {
        return currentBookDataset;
    }
}

Book.prototype.deleteBookFromLibrary = function () {
    deleteBookFromHTML(this);
    myLibrary = myLibrary.filter((book) =>
        compareBooks(this.dataset, book.dataset)
    );

};

Book.prototype.editBook = function () {                         //this guy iterates through the edit form input and replaces it's value by looking if book constructor has an attribute that corresponded to the input id (which is luckly named the same way)
    var editFormInput = editBookForm.querySelectorAll(`input`)
    for (let i = 0; i < editFormInput.length; i++) {
        editFormInputId = editFormInput[i].getAttribute('id')
        editFormInput[i].value = this[editFormInputId];
    }
}

function addBookToHTML(book) {
    var newBookCard = document.createElement('li');
    newBookCard.setAttribute('id', (book.title + book.author).split(" ").join(""));
    newBookCard.setAttribute('data', book.dataset);
    for (let i = 0; i < (Object.keys(book).length - 1); i++) { // -1 in range to not print the last position (dataset)
        var descriptionKey = document.createElement('div');
        descriptionKey.setAttribute('id', Object.keys(book)[i]);
        descriptionKey.setAttribute('class', 'key');
        descriptionKey.innerText = Object.keys(book)[i];
        var descriptionValue = document.createElement('div')
        descriptionValue.setAttribute('id', Object.keys(book)[i]);
        descriptionValue.setAttribute('class', 'value');
        descriptionValue.innerText = Object.values(book)[i];
        newBookCard.appendChild(descriptionKey);
        descriptionKey.appendChild(descriptionValue);

    }
    var generatedButtons = generateEditAndDeleteButtons(book);
    var bookCover = document.createElement('img')
    bookCover.setAttribute('class', 'image');
    bookCover.setAttribute('src', './images/bookcover.jpg');
    bookCover.setAttribute('data', book.dataset);
    newBookCard.appendChild(bookCover);
    newBookCard.appendChild(generatedButtons);
    grid.appendChild(newBookCard);
}

function generateEditAndDeleteButtons(book) {
    var editBookButton = document.createElement('img')
    editBookButton.setAttribute('class', 'editbutton');
    editBookButton.setAttribute('src', './images/edit.svg');
    editBookButton.setAttribute('data', book.dataset);
    editBookButton.addEventListener('click', () => {  // editing is not yet implemented
        book.editBook()
    });
    var deleteBookButton = document.createElement('img')
    deleteBookButton.setAttribute('class', 'deletebutton');
    deleteBookButton.setAttribute('src', './images/delete.svg');
    deleteBookButton.setAttribute('data', book.dataset);
    deleteBookButton.addEventListener('click', () => {
        book.deleteBookFromLibrary()
    });
    var buttonBox = document.createElement('div');
    buttonBox.setAttribute('class', `buttonBox`);
    buttonBox.setAttribute('data', book.dataset);
    buttonBox.appendChild(editBookButton);
    buttonBox.appendChild(deleteBookButton);
    return buttonBox;
}

function deleteBookFromHTML(book) {
    var cardToDelete = document.querySelector(`[data="${book.dataset}"]`)
    console.log(cardToDelete)
    cardToDelete.remove();
}

function checkReadPagesInput() {
    if (readPagesInput.value > pagesInput.value) {
        submitNewBookButton.disabled = true;
    } else {
        submitNewBookButton.disabled = false;

    }
}


const book1 = new Book("Rings sd", "Tolkien", 320, 12, false);
const book2 = new Book("chleb", "pies", 333, 22, false);
const book3 = new Book("Ringes", "Tolkien", 320, 12, false);
const book4 = new Book("Total Recall", "aNieWiem", 320, 12, false);

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book4.addBookToLibrary();


newBookFormSwitch.addEventListener('click', () => {
    newBookForm.classList.toggle('visible');
});

submitNewBookButton.addEventListener('click', () => {
    var newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readPagesInput.value, isReadYes.checked); // later add validation fot this values by sending it to 'generateNewBook' first
    newBook.addBookToLibrary();

});


document.addEventListener('keydown', (e) => { hidenewBookForm(e) })
// document.addEventListener('keydown', () => { checkReadPagesInput() }) // this doesn't work as intended for now

// deleteButton.addEventListener('click', () => {
//     console.log(this);
// });


isReadYes.addEventListener('click', () => {
    readPagesInput.value = pagesInput.value
    readPagesInput.setAttribute('disabled', 'true')
});

isReadNo.addEventListener('click', () => {
    readPagesInput.removeAttribute('disabled')
});

function hidenewBookForm(e) {
    if ((newBookForm.classList.contains('visible')) && (e.key === 'Escape')) {
        newBookForm.classList.toggle('visible')
    };
}
