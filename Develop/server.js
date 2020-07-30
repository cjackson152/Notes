  
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const path = require("path");
const fs = require("fs");
const direct = path.join(__dirname, "/public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function(req,res) {
    res.sendFile(path.join(direct, "notes.html"));

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);


});

app.get("*", function(req, res) {
    res.sendFile(path.join(direct, "index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
})

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"), "utf8");
    let newNote = req.body;
    let uniqueId = (savedNotes.length).toString();
    newNote.id = uniqueId;
    savedNotes.push(newNote);
    fs.writeFileSynce("./db/db.json", JSON.stringify(savedNotes));
    console.log("Notes Saved!");
    res.json(savedNotes);
});

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleted note with Id ${noteId}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != newId.toString();
    })
    for (currNote of savedNotes) {
        currNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})

});