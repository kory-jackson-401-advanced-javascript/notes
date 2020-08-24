'use strict';

let notesSchema = require('./notes-schema.js');


/**
 * Notes Collection that allows CRUD operations for any model
 */
class NotesCollection {
    constructor() {
    }

    /**
     * Finds list of notes
     * @param {category} category - Category of notes proper category
     * @param {'{}'} category - Empty object if no category specified 
     */
    async get(category) {
        if (category) {
            return await notesSchema.find({category});
        } else {
            return await notesSchema.find({});
        }
    }
    /**
     * Saves notes to database
     * @param {command} command - Command object from Input 
     */
    async post(command){
        let newCommand = new notesSchema(command);
        return await newCommand.save();
    }
    /**
     * Deletes Note by ID
     * @param {ID} _id - ID of the note to be deleted
     */
    async delete(_id) {
        return await notesSchema.deleteOne({_id});
    }    
}

module.exports = NotesCollection;