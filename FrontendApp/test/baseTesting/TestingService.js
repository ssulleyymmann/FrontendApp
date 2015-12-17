//http://jsfiddle.net/B72tr/
var app = angular.module('app', []);

app.factory('Book', function ($http) {
    var format = function (rawData) {
        var book = null;

        if (typeof rawData !== 'undefined') {
            book = {
                title: rawData.mainTitle,
                author: rawData.author.name,
                synopsis: rawData.info.synopsis
            };
        }

        return book;
    };

    var getBook = function (isbn, book) {
        return $http.get('http://books.web.com/isbn/' + isbn);
    }

    return {
        format: format,
        get: getBook
    };

});

describe('testing Book service', function () {
    var data = { mainTitle: "Testing with Jasmine", author: { name: "Robert" }, info: { synopsis: "yadda yadda" } };
    var bookService = null, httpBackend, isbn = 123123123;

    beforeEach(module('app'));

    beforeEach(inject(function ($httpBackend, Book) {
        httpBackend = $httpBackend;
        httpBackend.when('GET', 'http://books.web.com/isbn/' + isbn).respond(data);
        bookService = Book;
    }));

    it("should get a book and format it", function () {
        var book = null;

        // receive the promise and fills the book
        bookService.get(isbn)
            .success(function (data) {
                book = bookService.format(data);
            })
            .error(function (data) {
                book = null;
            });

        // sends the data to the promise
        httpBackend.flush();

        expect(book).not.toBeNull();
        expect(book.title).toBeDefined();
        expect(book.title).toEqual('Testing with Jasmine');
        expect(book.author).toBeDefined();
        expect(book.author).toEqual('Robert');
        expect(book.synopsis).toBeDefined();
        expect(book.synopsis).toEqual('yadda yadda');
    });
});