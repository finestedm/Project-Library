var myLibrary = [];

var grid = document.querySelector('.grid');
var formSwitch = document.getElementById('add-new-book');
var form = document.getElementById('new-book-details');
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

function Book(title, author, pagesInput, readPagesInput, isRead) {
    this.title = title;
    this.author = author;
    this.pagesInput = pagesInput;
    this.readPagesInput = readPagesInput;
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
    var bookCover = document.createElement('img')
    bookCover.setAttribute('class', 'image');
    bookCover.setAttribute('src', './images/bookcover.jpg');
    bookCover.setAttribute('data', book.dataset);
    newBookCard.appendChild(bookCover);
    var editBookButton = document.createElement('img')
    editBookButton.setAttribute('id', `edit${book.title}${book.author}`);
    editBookButton.setAttribute('class', 'editbutton');
    editBookButton.setAttribute('src', './images/edit.svg');
    editBookButton.setAttribute('data', book.dataset);
    var deleteBookButton = document.createElement('img')
    deleteBookButton.setAttribute('id', `delete${book.title}${book.author}`);
    deleteBookButton.setAttribute('class', 'deletebutton');
    deleteBookButton.setAttribute('src', './images/delete.svg');
    deleteBookButton.setAttribute('data', book.dataset);
    var buttonBox = document.createElement('div');
    buttonBox.setAttribute('id', `buttonBox${book.title}${book.author}`);
    buttonBox.setAttribute('class', `buttonBox`);
    buttonBox.setAttribute('data', book.dataset);
    buttonBox.appendChild(editBookButton);
    buttonBox.appendChild(deleteBookButton);
    newBookCard.appendChild(buttonBox);
    grid.appendChild(newBookCard);
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


formSwitch.addEventListener('click', () => {
    form.classList.toggle('visible');
});

submitNewBookButton.addEventListener('click', () => {
    var newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readPagesInput.value, isReadYes.checked); // later add validation fot this values by sending it to 'generateNewBook' first
    newBook.addBookToLibrary();

});


document.addEventListener('keydown', (e) => { hideForm(e) })
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

function hideForm(e) {
    if ((form.classList.contains('visible')) && (e.key === 'Escape')) {
        form.classList.toggle('visible')
    };
}

var deleteButtons = document.querySelectorAll('.deletebutton');
deleteButtons.forEach(element => {
    element.addEventListener('click', (e) => {
        var bookToDelete = e.target.getAttribute('data');
        bookToDelete.deleteBookFromLibrary();
    });
});