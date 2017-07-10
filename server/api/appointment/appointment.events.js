/**
 * Appointment model events
 */

'use strict';

import {EventEmitter} from 'events';
var Appointment = require('../../sqldb').Appointment;
var AppointmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AppointmentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Appointment.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AppointmentEvents.emit(event + ':' + doc._id, doc);
    AppointmentEvents.emit(event, doc);
    done(null);
  }
}

export default AppointmentEvents;
