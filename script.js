var myLibrary = [];

var grid = document.querySelector('.grid');

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
    var card = document.createElement('card');
    for (let i = 0; i < Object.keys(book).length; i++) {
        var DescriptionElement = document.createElement('div');
        DescriptionElement.setAttribute('id', Object.keys(book)[i]);
        DescriptionElement.setAttribute('class', 'description');
        DescriptionElement.innerText = Object.values(book)[i];
        card.appendChild(DescriptionElement);
    }
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
console.log(myLibrary);
