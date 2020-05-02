const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your Notes'; 
}

const addNote = function(noteTitle, noteBody) {
    const notes = _loadNotes();

    const duplicateNotes = notes.filter(function(note) {
        return note.title === noteTitle;
    });
    if (duplicateNotes.length) {
        console.log(chalk.red('Duplicate Note'));
        return; 
    }
    const newNote = {
        title: noteTitle,
        body: noteBody
    };
    notes.push(newNote);
    saveNotes(notes);
    console.log(chalk.green('Note added successfully'));
}

const _loadNotes = function () {
    try {
        const notesBuffer = fs.readFileSync('notes.json').toString();
        return JSON.parse(notesBuffer);
    } catch (error) {
        console.log('new file');
        return [];
    }
}

const removeNote = function (title) {
    let notes = _loadNotes();
    const updatedNotes = notes.filter(function(note) {
        return note.title !== title;
    })

    if (updatedNotes.length && updatedNotes.length !== notes.length) {
        notes = updatedNotes;
        saveNotes(notes);
        console.log(chalk.green('Note Removed.'));
    } else {
        console.log(chalk.red('Invalid Note'));
    }
};

const readNote = (nodeTitle) => {
    const notes = _loadNotes();

    const noteToReturn = notes.find((note) => {
        return note.title === nodeTitle;
    });
    return noteToReturn.body;
};

const listNotes = () => {
    const notes = _loadNotes();
    console.log(chalk.yellow('Listing all the notes'));
    notes.forEach((note) => {
        console.log('Title: ' + note.title);
        console.log('Body: ' + note.body);
    });
};

const saveNotes = function (notesArr) {
    const note = JSON.stringify(notesArr);
    fs.writeFileSync('notes.json', note);
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};