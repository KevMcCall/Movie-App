// Dependencies
// =============================================================
var express = require("express");
var app = express();
var path = require("path");

// Sets up the Express App
// =============================================================
var PORT = 3000;

// Sets up the Express app to handle data parsing
// for sending POST requests
//Parses the HTTP request body
// Allows Express to read the body and parse it to JSON
//urlencoded converts characters into a format that can be sent over the internet
// Extended: False it will display data differently
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Movie  Characters (DATA)
// =============================================================
var characters = [
    { 
        routeName: "hulk",
        name: "Hulk",
        role: "Avenger",
        age: 49,
        superPower: "Superhuman Strength"

    },

    { 
        routeName: "thor",
        name: "Thor",
        role: "Avenger",
        age: 1500,
        superPower: "Superhuman Strength"

    },

    { 
        routeName: "ironman",
        name: "Iron Man",
        role: "Avenger",
        age: 48,
        superPower: "Powered Armor Suit"

    },

    { 
        routeName: "spiderman",
        name: "Spider Man",
        role: "Avenger",
        age: 28,
        superPower: "Web Shooting"

    },

    { 
        routeName: "captainamerica",
        name: "Captain America",
        role: "Avenger",
        age: 39,
        superPower: "Super Soldier"

    }
];



// Routes
// =============================================================
// Basic route that sends the user first to the Pages
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "view.html"))
});

app.get("/add", function(req, res){
    res.sendFile(path.join(__dirname, "add.html"))
});





// Displays all characters
app.get("/api/characters", function(req, res){
    res.json(characters);
});



// Displays a single character, or returns false
// Returns the parameter of a specified name
// Grab the selected parameter
// Goes through the array for the Characters
// : before our route to target an array
app.get('/api/:characters', function(req, res){

	var chosen = req.params.characters;

	if(chosen){
		console.log(chosen);

		for (var i=0; i <characters.length; i++){

			if (chosen == characters[i].routeName){
				res.json(characters[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(characters);
	}
})





// Create New Characters - takes in JSON input
// req.body hosts is equal to the JSON post sent from the user
// This works because of our body parsing middleware
app.post("/api/characters", function(req, res) {
    var newCharacter = req.body;

    console.log(newCharacter)

    characters.push(newCharacter);

    res.json(newCharacter);
});

  



// Using a RegEx Pattern to remove spaces from newCharacter
// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App is listening on port: " + PORT);
})
