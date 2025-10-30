// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers
import fs from "fs/promises"; // the file system module lets us read and write data from files

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000 while they are still in development process or testing. Also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json()); //To tell Express that our server will be receiving data in JSON format and sending data in JSON format

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`); //Success message
}); //this method is turning on our server

//We will create the beginnings of a CRUD application
//CRUD stands for CREATE READ UPDATE DELETE
//We are only g
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
const getAllBooks = async () => {
  //We want to read data from the books-data.json file
  //The fs.readFile() method takes in 2 parameters:
  // 1. The file path to the file we want to read from
  // 2. The encoding
  //data is still in JSON format
  const data = await fs.readFile("./books-data.json", "utf-8");
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named parsedBooks and store the parsed data in it converted using the JSON.parse method
  const parsedBooks = JSON.parse(data);
  //respond.send() sends text/string data in response
  //respond.json() sends JSON data in response
  return parsedBooks;
};
// 2. getOneBook(index)
const getOneBook = async (index) => {
  //We want to read data from the books-data.json file
  //The fs.readFile() method takes in 2 parameters:
  // 1. The file path to the file we want to read from
  // 2. The encoding
  //data is still in JSON format
  const data = await fs.readFile("./books-data.json", "utf-8");
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named parsedBooks and store the parsed data in it converted using the JSON.parse method
  const parsedBooks = JSON.parse(data);
  //respond.send() sends text/string data in response
  //respond.json() sends JSON data in response
  return parsedBooks[index];
};

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
app.get("/get-all-books", async (request, respond) => {
  const allBooks = await getAllBooks();
  respond.json(allBooks);
});

// 2. GET /get-one-book/:index
app.get("/get-one-book/:index", async (request, respond) => {
  let index = request.params.index;
  let book = await getOneBook(index);
  respond.json(book);
});
