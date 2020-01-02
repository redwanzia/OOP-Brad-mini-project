function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book) {
	const list = document.getElementById('book-list');
	const row = document.createElement('tr');
	row.innerHTML = `
  
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class ='delete'>X</a> </td>`;
	list.appendChild(row);
};
UI.prototype.showAlert = function(message, className) {
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));

	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');
	container.insertBefore(div, form);

	setTimeout(function() {
		document.querySelector('.alert').remove();
	}, 3000);
};

//deleteBook

UI.prototype.deleteBook = function(target) {
	if ((target.className = 'delete')) {
		target.parentElement.parentElement.remove();
	}
};

//clear fields

UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};

document.getElementById('book-form').addEventListener('submit', function(e) {
	e.preventDefault();

	//get fir values
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;

	//instantiate book
	const book = new Book(title, author, isbn);

	//instantiate UI
	const ui = new UI();

	//validate

	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Form must be filled', 'error');
	} else {
		ui.addBookToList(book);
		ui.showAlert('book added', 'success');
		ui.clearFields();
	}
});

//eventListener for Delete

document.getElementById('book-list').addEventListener('click', function(e) {
	e.preventDefault();
	const ui = new UI();

	ui.deleteBook(e.target);
	ui.showAlert('book removed', 'success');
});
