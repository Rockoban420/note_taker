const express = require ('express');
const fs = require ('fs');
const notes = require('./db/db.json');


const PORT = process.env.PORT || 3001;


// app variable = server object

const app = express();

// magic line that serves all of our front-end statically

app.use(express.static('public'));

// these 2 lines help us grab the data that
// is coming in from the front-end
// it will grab it and attach each key and turn it into an object
// in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body); 
    notes.push((req.body));
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2) , function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    res.json(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
    let index = req.params.id;
    notes.splice(index, 1);
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2) , function (err) {
        if (err) throw err;
        console.log('Deleted!');
      });
    res.json(`Deleted position number ${index} in database`);
});


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));