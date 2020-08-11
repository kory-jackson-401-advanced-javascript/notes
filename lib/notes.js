/*
Exports a constructor function
Has a prototype method called execute() that executes the correct operation, given the above object
How will you use that object to run the correct method?
You can predict that add won’t be the only action we’re going to have to handle…
Write a prototype method called add() that will create an object representing a note (with an ID and the note text as properties) and console.log the text of the note to be added when the add command is executed
*/

'use strict';

let  Notes = function (obj) {
  this.command = obj.command;
}

Notes.prototype.execute = function (obj) {
  // executes the correct operation, given the object

}

Notes.prototype.add = function () {
  try {
    let command = this.command;
    if ( !command ) {
      throw 'You must enter, --add or -a before your note';
    } else if (typeof command.payload === "boolean" || undefined) {
      throw 'You must enter a note';
    } else {
      console.log(command)
      return console.log(`${command.adding}: ${command.payload}`);
    }
  } catch (err) {
    console.error(err)
  }
  
}

module.exports = Notes;