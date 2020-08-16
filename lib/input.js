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


class Input {
  constructor() {
    this.args = minimist(process.argv.slice(2));
    this.command = {};
  
    Object.entries(this.args).forEach(([key, value]) => {
      switch(key) {
        case 'a':
        case 'add':
          if ( typeof value !== 'boolean' ) this.command = { action: 'add', payload: value };
          break;
        case 'c':
        case 'category':
          this.command.category = value;
          break;
        case 'l':
        case 'list':
          this.command = { action: 'list', category: value };
          if ( typeof this.command.category === 'boolean' ) this.command.category = null;
          break;
        case 'd':
        case 'delete':
          this.command = { action: 'delete', id: value };
          if ( typeof value === 'boolean' ) this.command.id = null;
        default:
          break;
      }
    });
  }
}



module.exports = Input;
