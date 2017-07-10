/**
 * Shifts model events
 */

'use strict';

import {EventEmitter} from 'events';
var Shifts = require('../../sqldb').Shifts;
var ShiftsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShiftsEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Shifts.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ShiftsEvents.emit(event + ':' + doc._id, doc);
    ShiftsEvents.emit(event, doc);
    done(null);
  }
}

export default ShiftsEvents;
