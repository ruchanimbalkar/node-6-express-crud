// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers
import fs from "fs/promises"; // the file system module lets us read and write data from files

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, functions, properties of express
// which will be saved in app
const app = express();

//Defining our port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000 while they are still in development process or testing. Also there are some port numbers you cannot use.

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json()); //To tell Express that our server will be receiving data in JSON format and sending data in JSON format

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`); //Success message
}); //this method is turning on our server

//We will create the beginnings of a CRUD application
//CRUD stands for CREATE READ UPDATE DELETE
//We are only getting getting data [GET requests], so we will use READ application at this time
// ---------------------------------
// Helper Functions
// ---------------------------------
const readBookData = async () => {
  //We want to read data from the books-data.json file
  //The fs.readFile() method takes in 2 parameters:
  // 1. The file path to the file we want to read from
  // 2. The encoding
  //data is still in JSON format
  const data = await fs.readFile("./books-data.json", "utf-8");
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named parsedBooks and store the parsed data in it converted using the JSON.parse method
  const parsedBooks = JSON.parse(data);
  //return parsedBooks
  return parsedBooks;
};

// 1. getAllBooks()
const getAllBooks = async () => {
  //Declare a variable named books and store the value readBookData() returns in it
  const books = await readBookData();
  //return parsedBooks
  return books;
};
// 2. getOneBook(index)
const getOneBook = async (index) => {
  //Declare a variable named books and store the value readBookData() returns in it
  const books = await readBookData();
  //if index is not a valid number, if index greater than lenght of books arrray
  if (index >= books.length) {
    //return error message
    return "Book not found! Status Code 500";
  } else {
    // return the book at the index in books
    return books[index];
  }
};

const getOneBookTitle = async (index) => {
  //Declare a variable named books and store the value readBookData() returns in it
  const books = await readBookData();
  //if index is not a valid number, if index greater than lenght of books arrray
  if (index >= books.length) {
    //return error message
    return "Book title not found! Status Code 500";
  } else {
    // return the book title at the index in parsedBooks
    return books[index].title;
  }
};

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
app.get("/get-all-books", async (request, respond) => {
  //call the helper function and save its return value in a variable called "allBooks"
  const allBooks = await getAllBooks();
  //send all books as JSON data in the response
  respond.json(allBooks);
});

// 2. GET /get-one-book/:index
app.get("/get-one-book/:index", async (request, respond) => {
  //get the value of the index dynamic parameter
  let index = request.params.index;
  //call the helper function that gets the book from the file
  let result = await getOneBook(index);
  if (typeof result === Object) {
    //send the book as JSON data in the response
    respond.json(result);
  } else {
    respond.send(result);
  }
});

//3. GET /get-one-book-title/:index
app.get("/get-one-title/:index", async (request, respond) => {
  //get the value of the index dynamic parameter
  let index = request.params.index;
  //call the helper function that gets the book from the file
  let result = await getOneBookTitle(index);
  if (typeof result === Object) {
    //alternative 1 send the title as text data in the response
    //respond.send(bookTitle);
    // or alternative 2 : send the response as a valid JSON object
    respond.json({ title: result }); //Most APIs expect JSON data
  } else {
    respond.send(result);
  }
});
