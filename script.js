var myLibrary = [];

var grid = document.querySelector('.grid');
var formSwitch = document.getElementById('add-new-book')
var form = document.getElementById('new-book-details')



function Book(title, author, pages, readPages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readPages = readPages;
    this.isRead = isRead;
}



Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
    addBookToHTML(this);
};

function compareBooks(toDeleteBookTitle, currentBookTitle, toDeleteBookAuthor, currentBookAuthor) {
    if (
        toDeleteBookTitle !== currentBookTitle ||
        toDeleteBookAuthor !== currentBookAuthor
    ) {
        return currentBookTitle;
    }
}

Book.prototype.deleteBookFromLibrary = function () {
    myLibrary = myLibrary.filter((book) =>
        compareBooks(this.title, book.title, this.author, book.author)
    );
};

function addBookToHTML(book) {
    var card = document.createElement('li');
    for (let i = 0; i < Object.keys(book).length; i++) {
        var DescriptionKey = document.createElement('div');
        DescriptionKey.setAttribute('id', Object.keys(book)[i]);
        DescriptionKey.setAttribute('class', 'key');
        DescriptionKey.innerText = Object.keys(book)[i];
        var DescriptionValue = document.createElement('div')
        DescriptionValue.setAttribute('id', Object.keys(book)[i]);
        DescriptionValue.setAttribute('class', 'value');
        DescriptionValue.innerText = Object.values(book)[i];
        card.appendChild(DescriptionKey);
        DescriptionKey.appendChild(DescriptionValue);

    }
    var bookCover = document.createElement('img')
    bookCover.setAttribute('class', 'image');
    bookCover.setAttribute('src', './images/bookcover.jpg');
    card.appendChild(bookCover);
    grid.appendChild(card);
}


const book1 = new Book("Rings", "Tolkien", 320, 12, false);
const book2 = new Book("chleb", "pies", 333, 22, false);
const book3 = new Book("Ringes", "Tolkien", 320, 12, false);
const book4 = new Book("Total Recall", "aNieWiem", 320, 12, false);

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book4.addBookToLibrary();

book3.deleteBookFromLibrary();

formSwitch.addEventListener('click', () => {
    form.classList.toggle('visible');
});

document.addEventListener('keydown', (e) => { hideForm(e) })

function hideForm(e) {
    if ((form.classList.contains('visible')) && (e.key === 'Escape')) {
        form.classList.toggle('visible')
    };
}