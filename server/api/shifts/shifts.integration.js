'use strict';

var app = require('../..');
import request from 'supertest';

var newSettings;

describe('Settings API:', function() {

  describe('GET /api/shifts', function() {
    var settingss;

    beforeEach(function(done) {
      request(app)
        .get('/api/shifts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          settingss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      settingss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/shifts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/shifts')
        .send({
          name: 'New Settings',
          info: 'This is the brand new shifts!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSettings = res.body;
          done();
        });
    });

    it('should respond with the newly created shifts', function() {
      newSettings.name.should.equal('New Settings');
      newSettings.info.should.equal('This is the brand new shifts!!!');
    });

  });

  describe('GET /api/shifts/:id', function() {
    var shifts;

    beforeEach(function(done) {
      request(app)
        .get('/api/shifts/' + newSettings._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          shifts = res.body;
          done();
        });
    });

    afterEach(function() {
      shifts = {};
    });

    it('should respond with the requested shifts', function() {
      shifts.name.should.equal('New Settings');
      shifts.info.should.equal('This is the brand new shifts!!!');
    });

  });

  describe('PUT /api/shifts/:id', function() {
    var updatedSettings;

    beforeEach(function(done) {
      request(app)
        .put('/api/shifts/' + newSettings._id)
        .send({
          name: 'Updated Settings',
          info: 'This is the updated shifts!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSettings = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSettings = {};
    });

    it('should respond with the updated shifts', function() {
      updatedSettings.name.should.equal('Updated Settings');
      updatedSettings.info.should.equal('This is the updated shifts!!!');
    });

  });

  describe('DELETE /api/shifts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/shifts/' + newSettings._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when shifts does not exist', function(done) {
      request(app)
        .delete('/api/shifts/' + newSettings._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
