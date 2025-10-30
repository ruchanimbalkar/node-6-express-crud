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

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

const getAllRecipes = async () => {
  //Read the books data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf-8");
  console.log("data", data);
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named recipes and store the parsed data in it converted using the JSON.parse method
  const recipes = JSON.parse(data);
  //return recipes
  return recipes;
};

// 2. getOneRecipe(index)

const getOneRecipe = async (index) => {
  //Read the books data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf-8");
  console.log("data", data);
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named recipes and store the parsed data in it converted using the JSON.parse method
  const recipes = JSON.parse(data);
  console.log(recipes);
  //return recipe at that index using index
  return recipes[index];
};

// 3. getAllRecipeNames()
const getAllRecipeNames = async () => {
  //Read the recipes data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf-8");
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named recipes and store the parsed data in it converted using the JSON.parse method
  const recipes = JSON.parse(data);
  //Get names from recipes
  //Declare an empty array called "names"
  let names = [];
  //Using for each loop store names of recipes in the names array
  recipes.forEach((recipe) => names.push(recipe.name));
  //return names
  return names;
};

// 4. getRecipesCount()

const getRecipesCount = async () => {
  //Read the recipes data from the recipes-data.json file
  const data = await fs.readFile("./recipes-data.json", "utf-8");
  //convert it to JavaScript : We need to parse the JSON object into JavaScript
  //Declare a variable named recipes and store the parsed data in it converted using the JSON.parse method
  const recipes = JSON.parse(data);
  // return length of recipes (#number/count)
  return recipes.length;
};

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (request, respond) => {
  //call the helper function and save its return value in a variable called "recipes"
  const recipes = await getAllRecipes();
  console.log("recipes", recipes);
  //send all recipes as JSON data in the response
  respond.json(recipes);
});

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (request, respond) => {
  let index = request.params.index;
  //call the helper function and save its return value in a variable called "recipe"
  let recipe = await getOneRecipe(index);
  //send one recipe as JSON data in the response
  respond.json(recipe);
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (request, respond) => {
  //call the helper function and save its return value in a variable called "names"
  const names = await getAllRecipeNames();
  //send recipe names as JSON data in the response
  respond.json(names);
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (request, respond) => {
  //call the helper function and save its return value in a variable called "count"
  let count = await getRecipesCount();
  //send count as JSON data in the response
  respond.json({ count: count }); //Most APIs expect JSON data
});
