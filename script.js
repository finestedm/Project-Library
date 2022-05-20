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

grid = document.querySelector('.grid');


for (let i = 0; i < myLibrary.length; i++) { // this loop iterates through myLibrary
    var card = document.createElement('card')  //creates card
    Object.keys(myLibrary[i]).forEach(element => { //then iterates through all keys inside each element of myLibrary
        var cardDescription = document.createElement(`div`); //and creates new element for each 
        cardDescription.setAttribute('class', element); //sets class according to key description
        card.appendChild(cardDescription); //and appends the card 
    });
    grid.appendChild(card)
}





