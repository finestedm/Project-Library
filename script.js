var myLibrary = [];

var grid = document.querySelector('.grid');
var newBookFormSwitch = document.getElementById('add-new-book');
var newBookForm = document.getElementById('new-book-details');
var editBookForm = document.getElementById('edit-book-details');
var titleInput = document.querySelector(`input[id=title]`);
var authorInput = document.querySelector(`input[id=author]`);
var pagesInput = document.querySelector(`input[id=pages]`);
var readPagesInput = document.querySelector(`input[id=readPages]`);
var isReadYes = document.querySelector(`#new-book-details label[for='isReadYes']`);
var isReadNo = document.querySelector(`#new-book-details label[for='isReadNo']`);
var submitNewBookButton = document.querySelector('#submit-new-book-button');
var editBookDetailsButton = document.querySelector('#submit-edit-book-button')
let index = 0;

{
    let dataset = 0
    function setDataset() {
        return dataset++
    }
}

class Book {
    constructor(title, author, pages, readPages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readPages = readPages;
        this.isRead = isRead;
        this.dataset = setDataset()
    }

    generateHTMLFromLibrary() {
        Book.prototype.deleteAllBooksFromHTML();
        for (let i = 0; i < myLibrary.length; i++) {
            Book.prototype.addBookToHTML(myLibrary[i])
        }
    }

    deleteAllBooksFromHTML() {
        let generatedBookCards = grid.querySelectorAll('li');
        for (let i = 0; i < generatedBookCards.length; i++) {
            generatedBookCards[i].remove()
        }
    }

    addBookToLibrary() {
        myLibrary.push(this);
        this.generateHTMLFromLibrary();
    }

    compareBooks(currentBookDataset) {
        if (
            this.dataset !== currentBookDataset
        ) {
            return currentBookDataset;
        }
    }

    deleteBookFromLibrary() {
        myLibrary = myLibrary.filter((book) =>
            this.compareBooks(book.dataset)
        );
        this.generateHTMLFromLibrary();

    };

    editBook() {
        //this guy iterates through the edit form input and replaces it's value by looking if book constructor has an attribute that corresponded to the input id (which is luckly named the same way)
        editBookForm.classList.add('visible');
        document.addEventListener('keydown', (e) => { hideBookForm(e) })


        for (let i = 0; i < myLibrary.length; i++) {
            if (this.dataset === myLibrary[i].dataset) {
                index = i;
            }
        }

        var editFormInput = editBookForm.querySelectorAll(`li>input`)
        for (let i = 0; i < editFormInput.length; i++) {
            let editFormInputId = editFormInput[i].getAttribute('id')
            editFormInput[i].value = this[editFormInputId];
        }

        editBookDetailsButton.addEventListener('click', () => {
            for (let i = 0; i < editFormInput.length; i++) {
                let editFormInputId = editFormInput[i].getAttribute('id');
                myLibrary[index][editFormInputId] = editFormInput[i].value;
            };
            this.generateHTMLFromLibrary();

        });
    }

    addBookToHTML(book) {

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


function checkReadPagesInput(readPages, pages) {
    if (readPages > pages) {
        submitNewBookButton.disabled = true;
    } else {
        submitNewBookButton.disabled = false;

    }
}


newBookFormSwitch.addEventListener('click', () => {
    newBookForm.classList.add('visible');
});

submitNewBookButton.addEventListener('click', () => {
    function isBookRead() {
        if (readPagesInput.value == pagesInput.value) {
            return true
        } else if (readPagesInput.value > pagesInput.value) {
            return 'mistake?'
        } else {
            return false
        }
    }
    var newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readPagesInput.value, isBookRead()); // later add validation fot this values by sending it to 'generateNewBook' first
    newBook.addBookToLibrary();

});


document.addEventListener('keydown', (e) => { hideBookForm(e) })
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


function hideBookForm(e) {
    if ((newBookForm.classList.contains('visible')) && (e.key === 'Escape')) {
        newBookForm.classList.toggle('visible')
    };
    if ((editBookForm.classList.contains('visible')) && (e.key === 'Escape')) {
        editBookForm.classList.toggle('visible')
    };
}
