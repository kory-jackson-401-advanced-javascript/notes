#!/usr/bin/env node

'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

let Input = require('./lib/input.js');
let Notes = require('./lib/notes.js');

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const input = new Input();
const note = new Notes();

const runApp = (record) => {
    if (record.command.action) {
        note.execute(record.command)
    }
    else {
        help();
    }
}

function help() {
    console.error(`
    Invalid info arguments.

    --add or -a "note" -category or -c "category" to add note in specified category
    
    --list or -l to list all inside of database

    --list or -l --category or -c "category" to list all notes in specific category

    --delete or -d "id" you must enter the id after arguments to delete note. Run --list to see id of note you want to delete.
    
    `)
    mongoose.disconnect();
}

runApp(input);
