//Require is very similar to import as it adds modules to use to the file.
var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js");

//Sets express to variable app.
var app = express();
//Enables/allows cors requests.
app.use(cors());
//BodyParser parses incoming request.
app.use(bodyParser.urlencoded({ extended: false }));
//Express.json recognizeses the incoming request.
app.use(express.json());
//Sets the variable port to 3001.
var port = 3001;
//App.listen is used to bind the connection to the specified port.
app.listen(port, () => {
     console.log("Running on port 3001")
});
//app.post gets the information provided to http://localhost:3001/api/add.
app.post("/api/add", (req,res)=>{
    //A bunch of constants are set to be used to insert data into a sqlite database.
    //It sets the constat to one of the values that was provided to app.post.
    const ID = req.body.ID;
    const FirstName = req.body.FirstName;
    const Surname = req.body.Surname;
    const Allergies = req.body.Allergies;
    const Treatment = req.body.Treatment;
    const Perscriptions = req.body.Perscriptions;
    //2 constants are set 1 for each table as each constant is assigned an sql insert statement for a table.
    //The question marks are placeholders for the values that are provided.
    const sqlPatients = "INSERT INTO Patients (ID, FirstName, Surname, Allergies) VALUES (?,?,?,?)";
    const sqlTreatments = "INSERT INTO Treatment (ID, Treatment, Perscriptions) VALUES (?,?,?)";
    //db.run executes the sqlite statement using the entered paramaters.
    db.run(sqlPatients,[ID, FirstName, Surname, Allergies], (err,result)=>{
    });
    db.run(sqlTreatments,[ID, Treatment, Perscriptions], (err,result)=>{
    });
});
//app.get sends data to http://localhost:3001/api/getpatients.
app.get("/api/getpatients", (req, res)=>{
    //A constants is set for a table as it is assigned an sql insert statement.
    //This sqlite statement also joins 2 tables together based on an ID and output the 2 joined tables.
    const sqlGetPatients = "SELECT * FROM Patients LEFT JOIN Treatment ON Patients.ID=Treatment.ID";
    db.all(sqlGetPatients, (err,result)=>{
        //res.send sends the reults to the website for them to be displayed.
        res.send(result)
    });
    
});