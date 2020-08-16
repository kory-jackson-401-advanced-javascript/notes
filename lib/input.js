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
  

    let objectKeyArr = Object.keys(this.args);

    for (let i = 0; i < objectKeyArr.length; i ++) {
      let key = objectKeyArr[i];
      let val = this.args[key];
      
      switch (key) {
        case 'a':
        case 'add':
          this.command = { action: 'add', payload: val };
          return;
        default:
          break;
      }
    }    
  }

  valid() {
    if (!this.command) return false;

    if (!this.command.action) return false;

    switch (this.command.action) {
      case 'add':
        return typeof this.command.payload === 'string';
      default:
        break;
    }
  }
}



module.exports = Input;
