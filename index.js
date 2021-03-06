#!/usr/bin/env node

'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

let Input = require('./lib/input.js');
let Notes = require('./lib/notes.js');
/**
 * Connects to the database
 * @param DB - connects to MongoDBAtlas
 */
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const input = new Input();
const note = new Notes();

/**
 * Starts the application when correct params are listed
 * @param {input} record - takes in the input and checks for the action
 * @param {action} record.command - runs the execute for that action
 * @throws Will throw an eror if no action is entered in, prompts correct actions.
 */
const runApp = (record) => {
    if (record.command.action) {
        note.execute(record.command)
    }
    else {
        help();
    }
}
/**
 * The error function that gets thrown if there is no actions passed through
 */
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
