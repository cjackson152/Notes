const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;
const direct = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(direct, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.get("*", function(req, res) {
    res.sendFile(path.join(direct, "index.html"));
});

app.get("/api/notes/:id", function(req, res) {
    let myNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.delete("/api/notes/:id", function(req, res) {
    let myNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note: ${noteID}`);
    myNotes = myNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of myNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(myNotes));
    res.json(myNotes);
})
app.post("/api/notes", function(req, res) {
    let myNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (myNotes.length).toString();
    newNote.id = uniqueID;
    myNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(myNotes));
    console.log("Note Saved! ", newNote);
    res.json(myNotes);
})



app.listen(port, function() {
    console.log(`Connected: ${port}.`);
})