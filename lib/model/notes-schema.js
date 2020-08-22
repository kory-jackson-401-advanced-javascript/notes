'use strict';

const mongoose = require('mongoose');

const notes = mongoose.Schema({
    note: { type: String, required: true },
    category: { type: String, required: true }
});

notes.post('save', function(obj) {
    let savedNote = notes.find(obj);
    console.log(savedNote);
});


module.exports = mongoose.model('Notes', notes);