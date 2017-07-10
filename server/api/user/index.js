'use strict';

import {
	Router
} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/physicians', auth.isAuthenticated(), controller.getPhysicians);
router.get('/physicians/all', auth.isAuthenticated(), controller.getPhysiciansData);
router.get('/patients', auth.isAuthenticated(), controller.getPatients);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/forgot', controller.forgotPassword);
router.put('/reset/:token', controller.resetPassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);

export default router;