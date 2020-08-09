/*
Exports a constructor function
Uses minimist (or any other node/npm library of your choosing) to read command line arguments
On instantiation, evaluates and validates the input
Is the command (i.e. ‘–add’) a valid command
Is there data associated with the command
Returns an instance containing the action to perform and the payload for the action
for example:
*/
'use strict';

let minimist = require('minimist');
let throwError = require('./error');


const Input = function () {

  const args = minimist(process.argv.slice(2));

  this.action = this.action(args);
  this.payload = this.payload(args);
}

Input.prototype.action = function (args) {
    if ( args.add ) { return "add" }
    else if ( args.a ) { return "add" }
    else { return console.error(throwError('You must enter an action')) };
}

Input.prototype.payload = function (args) {
  console.log(args)
  if ( args.payload ) { return args.payload }
  else { return console.error(throwError('You must enter a note!!')) }
}


module.exports = Input;