/*
Exports a constructor function
Has a prototype method called execute() that executes the correct operation, given the above object
How will you use that object to run the correct method?
You can predict that add won’t be the only action we’re going to have to handle…
Write a prototype method called add() that will create an object representing a note (with an ID and the note text as properties) and console.log the text of the note to be added when the add command is executed
*/

'use strict';

class Notes  {
  constructor(obj){
    if (obj.valid()) this.execute(obj.command);
    else console.error('Invalid info passed through')
  }


  add(payload) {
    let id = Math.floor(Math.random() * 1000);
    console.log('Adding note', id, ':', payload );
  }

  execute(command) {
    switch (command.action) {
      case 'add':
        this.add(command.payload);
        break;
      default:
        break;
    }
  }

}



module.exports = Notes;