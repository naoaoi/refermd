/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Shifts              ->  index
 * POST    /api/Shifts              ->  create
 * GET     /api/Shifts/:id          ->  show
 * PUT     /api/Shifts/:id          ->  update
 * DELETE  /api/Shifts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Shifts} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Settingss
export function index(req, res) {
  Shifts.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Shifts from the DB
export function show(req, res) {
  Shifts.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Shifts from the DB
export function getShitsbyDocId(req, res) {
  Shifts.findAll({
    where: {
      UserId: req.params.docId
    },
    attributes: [
      '_id',
				'start',
				'end',
				'dow'
			]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new Shifts in the DB
export function create(req, res) {
  Shifts.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Shifts in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Shifts.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Shifts from the DB
export function destroy(req, res) {
  Shifts.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
