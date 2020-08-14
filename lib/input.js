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


const Input = function () {

  const args = minimist(process.argv.slice(2));
  this.command = this.action(args);
  
}

Input.prototype.action = function (args) {
  let argsKey = Object.keys(args);
  if ( argsKey[1] === 'add' ) {
    return {adding: 'Adding Note', payload: args.add};
  } else if (argsKey[1] === 'a' ) {
    return {adding: 'Adding Note', payload: args.a};
  }
}

module.exports = Input;
