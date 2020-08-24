'use strict';

let minimist = require('minimist');

/**
 * Instance of the Input class
 */
class Input {
  constructor() {
    this.args = minimist(process.argv.slice(2));
    this.command = {};
    /**
     * Function to go to set the command inside of Input Constructor
     * @param {action} key - Key of key value pairs
     * @param {payload} value - Payload of key
     */
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
          if ( typeof this.command.category === 'boolean' ) return this.command.category = null;
          break;
        case 'd':
        case 'delete':
          this.command = { action: 'delete', id: value };
          if ( typeof value === 'boolean' ) return this.command.id = null;
        default:
          break;
      }
    });
  }
}



module.exports = Input;
