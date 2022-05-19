var myLibrary = [];

function Book(title, author, pages, readPages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readPages = readPages;
    this.isRead = isRead;
}

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
};


Book.prototype.deleteBookFromLibrary = function () {
    myLibrary = myLibrary.filter((book) =>
        compareBooks(book.title, book.author)
    );
};


function compareBooks(currentBookTitle, currentBookAuthor) {
    console.log(currentBookTitle);
    if (
        this.title !== currentBookTitle ||
        this.author !== currentBookAuthor
    ) {
        return currentBookTitle;
    }
}
compareBooks.prototype = Object.create(Book.prototype);



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
