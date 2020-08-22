'use strict';

let notesSchema = require('./notes-schema');

class NotesCollection {
    constructor() {
    }

    get(category) {
        if (category) {
            return notesSchema.find({ category });
        } else {
            return notesSchema.find({});
        }
    }

    post(command){
        let newCommand = new notesSchema(command);
        return newCommand.save();
    }

    put(_id, record) {
        return notesSchema.findByIdAndUpdate(_id, record, { new: true });
    }

    delete(_id) {
        return notesSchema.findByIdAndDelete(_id);
    }    
}

module.exports = NotesCollection;