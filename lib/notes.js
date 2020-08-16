/*
Exports a constructor function
Has a prototype method called execute() that executes the correct operation, given the above object
How will you use that object to run the correct method?
You can predict that add won’t be the only action we’re going to have to handle…
Write a prototype method called add() that will create an object representing a note (with an ID and the note text as properties) and console.log the text of the note to be added when the add command is executed
*/

'use strict';

const mongoose = require('mongoose');
const Note = require('./model/notes-schema.js');
const MONGODB_URI = 'mongodb://localhost:27017';

class Notes  {
  constructor(obj){
    if (obj.command.action) this.execute(obj.command);
    else console.error('Invalid info passed through')
  }

  execute(command) {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    switch (command.action) {
      case 'add':
        this.add(command);
        break;
      case 'list':
        this.list(command);
        break;
      case 'delete':
        this.delete(command);
        break;
      default:
        break;
    }
  }

  async add(command) {
    this.note = { note: command.payload };
    if ( command.category ) {
      this.note.category = command.category;
    };
    let noteToSave = new Note(this.note);

    try {
      await noteToSave.save();
      console.log(`Adding note: ${this.note.note}`);
    } catch(e) {
      console.error('Error adding your note!');
    }
    mongoose.disconnect();
  }

  listNotesFilter(array) {
    array.forEach(item => {
      console.log(item.note);
      console.log(item.category, item._id)
      console.log('-------')
    });
  }

  async list(command) {
    try {
      if ( command.category ) {
        let allNotes = await Note.find({category: command.category})
        this.listNotesFilter(allNotes);
      } else {
        let allNotes = await Note.find();
        this.listNotesFilter(allNotes);
      }
    } catch(e) {
      console.error(e);
    }
    mongoose.disconnect();
  }

  async delete(command) {
    if ( !command.id ) {
      console.error('ERROR, Note ID is required to delete entry.');
      mongoose.disconnect();
    } else {
      try {
        console.log(command);
        let deletedNote = await Note.deleteOne({ _id: command.id });
        if ( deletedNote.deletedCount > 0 ) console.log('Deleted', deletedNote.deletedCount, 'note(s).');
        else console.error('ERROR, Note ID was not found.');
        mongoose.disconnect();
      } catch(e) {
        console.error(e);
        mongoose.disconnect();
      }
    }
  }

}



module.exports = Notes;