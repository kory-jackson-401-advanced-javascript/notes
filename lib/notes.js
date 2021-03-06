'use strict';

const mongoose = require('mongoose');
const Note = require('./model/notes-collection.js');
const NotesCollection = require('./model/notes-collection.js');
let noteCollection = new Note();


/**
 * Notes class that runs all action methods
 */
class Notes  {
  constructor(){
  }
  /**
   * Switches to proper case method with given params
   * @param {add} command - runs the add method
   * @param {list} command - runs the list method
   * @param {delete} command - runs the delete method
   * @returns Console Log of action completed 
   */
  execute(command) {
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
  /**
   * Add method that saves notes to the database
   * @param {note} command - adds the proper note with given category
   * @returns Adding note: "payload of note"
   */
  async add(command) {
    this.note = { note: command.payload };
    if ( command.category ) {
      this.note.category = command.category;
    };

    try {
      await noteCollection.post(this.note);
      console.log(`Adding note: ${this.note.note}`);
    } catch(e) {
      console.error('Error adding your note!');
    }
    mongoose.disconnect();
  }
  /**
   * Callback function that populates given list
   * @param {allNotes} array - All notes in database
   * @param {selectedNotes} array - All notes in selected Category
   * @returns The correct list
   */
  listNotesFilter(array) {
    array.forEach(item => {
      console.log(item.note);
      console.log(item.category, item._id)
      console.log('-------')
    });
  }
  /**
   * Method that gets select notes from database
   * @param {category} command - Notes by Category
   * @param {command} command - All notes
   */
  async list(command) {
    try {
      if ( command.category ) {
        let selectedNotes = await noteCollection.get(command.category)
        this.listNotesFilter(selectedNotes);
      } else {
        let allNotes = await noteCollection.get();
        this.listNotesFilter(allNotes);
      }
    } catch(e) {
      console.error(e);
    }
    mongoose.disconnect();
  }
/**
 * Deletes notes by the ID
 * @param {id} command - ID of note to be deleted 
 * @returns Number of documents deleted
 */
  async delete(command) {
    if ( !command.id ) {
      console.error('ERROR, Note ID is required to delete entry.');
      mongoose.disconnect();
    } else {
      try {
        let deletedNote = await noteCollection.delete(command.id);
        if ( deletedNote.deletedCount > 0 ) {
          console.log('Deleted', deletedNote.deletedCount, 'note(s).');
        } else {
          console.error('ERROR, Note ID was not found.');
        }
        mongoose.disconnect();
      } catch(e) {
        console.error(e);
        mongoose.disconnect();
      }
    }
  }

}



module.exports = Notes;