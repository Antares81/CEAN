const fs = require('fs');


/**
    Get notes from a file
    @param f the file name
    @returns array of notes
*/
var fetchNotes = (f) => {
    var notes = [];
    if (fs.existsSync(`./${f}`)) {
        notes = JSON.parse(fs.readFileSync(f));
    }

    return notes;
}

/**
    Save the notes into a file
    @param f the file name
    @param n the notes array
*/
var saveNotes = (f, n) => {
    fs.writeFileSync(f, JSON.stringify(n));
}

/**
    Add a note
    @param title the note title
    @param description the note description
    @throws error
*/
const addNote = (title, description)  => {
    var note = {
        title:title,
        desc:description
    }

    try {
        var notes = fetchNotes('data.json');

        var duplicatedData = notes.filter((item) => {
            return item.title === title;
        });

        if (duplicatedData.length === 0) {
            notes.push(note);
            saveNotes('data.json', notes);
        } else {
            console.log(`Ya existe una nota con título ${title}`);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
    Delete note
    @param title the note title
    @return true if the delete action was ok. False in othe case
    @throws error
*/
const removeNote = (title) => {
    try {
        var notes = fetchNotes('data.json');

        var dataToPersist = notes.filter((item) => {
            return item.title !== title;
        });

        saveNotes('data.json', dataToPersist);

        return notes.length !== dataToPersist.length;
    } catch (error) {
        console.log(error);
    }
}

/**
    Get a note
    @param title the note title
    @returns the note
    @throws error
*/
const getNote = (title) => {
    try {
        var notes = fetchNotes('data.json');

        var dataFound = notes.filter((item) => {
            return item.title === title;
        });
        return dataFound.length > 0 ? dataFound[0] : null;
    } catch (error) {
        console.log(error);
    }
}

/**
    Get all notes
    @returns array of notes
    @throws error
*/
const getNotes = () => {
    try {
        return fetchNotes('data.json');
    } catch (error) {
        console.log(error);
    }
}

/**
    Edit a note
    @param title the note title
    @param description the note description
    @throws error
*/
const editNote = (title, description) => {
    try {
        var notes = fetchNotes('data.json');

        for (var i = 0 ; i < notes.length; i++) {
            if(notes[i].title === title) {
                notes[i].desc = description;
                break;
            }
        }

        saveNotes('data.json', notes);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Publishing methods
 */
module.exports = {
    addNote,
    removeNote,
    getNote,
    getNotes,
    editNote
}