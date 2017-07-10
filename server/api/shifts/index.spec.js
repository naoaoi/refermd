'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingsCtrlStub = {
  index: 'shiftsCtrl.index',
  show: 'shiftsCtrl.show',
  create: 'shiftsCtrl.create',
  update: 'shiftsCtrl.update',
  destroy: 'shiftsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var settingsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './shifts.controller': settingsCtrlStub
});

describe('shifts API Router:', function() {

  it('should return an express router instance', function() {
    settingsIndex.should.equal(routerStub);
  });

  describe('GET /api/shifts', function() {

    it('should route to shifts.controller.index', function() {
      routerStub.get
        .withArgs('/', 'shiftsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/shifts/:id', function() {

    it('should route to shifts.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'shiftsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/shifts', function() {

    it('should route to shifts.controller.create', function() {
      routerStub.post
        .withArgs('/', 'shiftsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/shifts/:id', function() {

    it('should route to shifts.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'shiftsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shifts/:id', function() {

    it('should route to shifts.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'shiftsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shifts/:id', function() {

    it('should route to shifts.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'shiftsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
