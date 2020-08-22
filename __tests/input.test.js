'use strict';

jest.mock('minimist')

const minimist = require('minimist');

minimist.mockImplementation(() => {
  return{
    _: [],
    add: 'I am a note',
    category: 'notes'
  };
});

let Input = require('../lib/input.js');

describe('testing if input is received', () => {
  it('intakes payload', () => {
    let input = new Input();

    expect(input.command.payload).toEqual('I am a note')
  });

  it('figures out which action is used', () => {
    let input = new Input();
    expect(input.command.action).toEqual('add');
  })

})