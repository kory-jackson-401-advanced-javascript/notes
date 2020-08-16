/*
As a user, I want to be able to call the application using command line standard syntax, indicating the text of a note I wish to add so that the system will eventually be able to save this note.
As a user, I expect that the application will confirm my intent.

The application must be able to parse command line arguments
e.g.
The --add (or -a) is used to tell your application that the user wants to ADD a new note
All of the text following the -a, within quotes is the text of the note itself
If the user doesn’t provide a valid argument (-a), show them an error
If the user specifies the flag, but doesn’t provide any text, show them an error
Otherwise, display a confirmation of the note text that they specified
*/

'use strict';



let Input = require('./lib/input.js');
let Notes = require('./lib/notes.js');


const input = new Input();
const note = new Notes(input);
