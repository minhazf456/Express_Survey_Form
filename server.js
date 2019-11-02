// Load express Module
var express = require("express");
// Invoke express and store the result in the variable app
var app = express();

// load express-session module
var session = require("express-session")

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
//// In order to be able to access POST data, we need to be able to pull it out of the request object. To do this, we first have to add a new setting to our app:
app.use(express.urlencoded({extended: true}));
// Set static folder for html and css files.
app.use(express.static(__dirname + "/static"));



// Set location for ejs views
app.set('views', __dirname + '/views');
// Set ejs views engine
app.set('view engine', 'ejs');


app.get("/", function(req,res){
    res.render("index")
})
// This is our index page, just rendering
// the template with the form


app.post("/results", function(req, res){
    res.render("results", {name: req.body.name, location: req.body.location, lang: req.body.lang, comment: req.body.comment})
})
//This is our POST which collects the information
// from the form via "req.body" which is a dictionary
// containing the information to then insert into
// our results template

// reset the counter
// app.post('/reset', function (request, response) {
//     request.session.counter = 1;
//     response.render('index', {
//         'counter': request.session.counter
//     });
// });

// tell the express app to listen on port 8000, always put this at the end of your server.js file

app.listen(8000, () => console.log("listening on port 8000"));