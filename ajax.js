// LEARNING GOALS
// Set up JSON Server as a mock backend
// Use Postman to mimic frontend responses
// Practice the client/server request/response cycle

// What is JSON?
// JSON stands for JavaScrit Object Notation -is data interchange format .
// It is used to send and receive data  between frontends and backends.
// It is human-readable. JSON data is stored as a String, but structured in a way that looks very similar to a JavaScript object.Plain text
// It is easy to convert into a JavaScript object. JavaScript has built-in methods for turning objects into JSON and vice versa. Very handy!
// Used with other languages

// { "name": "Annie Easley", "occupation": "Computer Scientist" }
//  // JSON DATA .

// The data above is a String, but you can see that it contains what looks like key/value pairs. Notice that the keys and values are both wrapped in quotes while other characters, {, }, and :, are not. This is required syntax for JSON. All text-based data, even keys, must be wrapped in quotes within the larger String. Numbers are the only exception to this.

// What is JSON Server?
// JSON Server is a freely available Node package that can turn a JSON file on your computer into mock data storage.(replicates a real server)
// When JSON Server is running, we can send requests to get data from storage or add data to it, as though we were talking to a server with a database.

// Setting Up Json
// 1. We need to install it  -  npm install -g json-server  (set up configuration if you are using live server)//
// 2. create a file that will act as our data storage.( db.json)
// 3. Fire up the server .In short start the db.json file that acts as our storage . json-server --watch db.json

// WHAT IS POSTMAN?
// Postman is an application that allows us to mock up frontend requests without writing any JavaScript.  // fetch request .
// With Postman, we can practice sending requests to our JSON Server.
// (Link in Canvas to downlod ) // Testing api

/*
Explain how to fetch data with fetch()

Food for thought ? Have you ever visited a webpage and it took long to load ? What did you do?

When it comes to making engaging web sites, we often find ourselves needing to send a lot of data (text, images, media, etc.) so that the page is exciting.

But browsers won't show anything until they've processed all of that data. As a result, they show nothing. The screen stays blank and users experience "waiting.

To solve this problem and help provide lots of other really great features, we developed a technique called AJAX.
I
n AJAX we:

Deliver an initial, engaging page using HTML and CSS which browsers render quickly
Then we use JavaScript to add more to the DOM, behind the scenes


Let us talk about the fetch function 
Fetch function is used to retrieve data.
1 .You can simply call it and passing in a path to a resource as arguments . It returns a promise object that represents what the data source sent back .Does not return the actual data.
2. To use the data that is returned by the fetch(), we need to chain on the then() method .method on the Promise object returned by calling
    `fetch()`. `then()` takes one argument: a callback function. 
3.  Inside the callback function, we do whatever processing we need on the object, in this case, converting it from JSON using the built-in `json()` method.
4 .   This time, the `then()` method is receiving the object that we returned from the first call to `then()` (our parsed JSON object). We capture the object in the parameter ` and pass it into a second callback function, where we will write code to do DOM manipulation using the data returned from the server


Construct a POST Request Using fetch()

fetch(destinationURL, configurationObject);
The configurationObject contains three core components that are needed for standard POST requests: the HTTP verb, the headers, and the body.
1. Add the http verb- method
2. Add Headers 
3.Add Data.- data to be sent 


*/


function readData(obj) {
  const card = document.querySelector("#card");
  // creating elements
  const plantContainer = document.createElement("div");
  let plantImage = document.createElement("img");
  let title = document.createElement("h3");
  let description = document.createElement("p");
  const deleteBtn = document.createElement("button");
  const updateBtn = document.createElement("button");
  // append the elements
  card.append(plantContainer);
  plantContainer.append(plantImage);
  plantContainer.append(title);
  plantContainer.append(description);
  plantContainer.append(deleteBtn);
  plantContainer.append(updateBtn);
  // add content to the buttons
  deleteBtn.textContent = "DELETE";
  updateBtn.textContent = "UPDATE";
  plantImage.src = obj.imageUrl;
  title.textContent = obj.name;
  description.textContent = obj.description;


  updateBtn.addEventListener("click", ()=>{
    const updatedName=prompt("Update Name: ");
    if(updatedName){
      obj.name=updatedName;
      title.textContent=updatedName;
      updatePlant(obj)
    }
  })


  deleteBtn.addEventListener("click" , ()=>{
    plantContainer.remove()
    deletePlant(obj.id)
  })
}
 

// Delete a plant resource
function deletePlant(id){
  fetch(`http://localhost:3000/plants/${id}` , {
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then(res=>res.json())

}

// updating -sending a patch request.
function updatePlant(obj){
  fetch(`http://localhost:3000/plants/${obj.id}`, {
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
  })
  .then(resp=>resp.json())
  .then(data=>readData(data))
}





// Fetch data from the db.json(storage)
const endpoint = "http://localhost:3000/plants";
function fetchPlants() {
  // promise
  fetch(endpoint)
    .then((res) => res.json()) // Getting data from the server
    .then((data) =>
      data.forEach(
        (plant) => readData(plant) // array - iterate thr
      )
    );
}
// initialize
fetchPlants();

// Get values from form .
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  // stop default behaviour of a form
  e.preventDefault();
  const plant = {
    imageUrl: document.querySelector("#plant-img").value,
    name: document.querySelector("#plant-name").value,
    description: document.querySelector("#description").value,
  };
  
  // calling the create plant function
  createPlant(plant);
  form.reset();
  
});

// WE HAVE TO SEND DATA TO THE SERVER - POST REQUEST TO THE SERVER .
function createPlant(obj) {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json())
  .then(data=>readData(obj))
}


