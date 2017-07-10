/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;

User.sync()
	.then(() => User.destroy({
		where: {}
	}))
	.then(() => {
		User.bulkCreate([{
				provider: 'local',
				first_name: 'John',
				last_name: 'Deo',
				email: 'john@patient.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 12,
				password: '1234',
				role: 'patient'
			}, {
				provider: 'local',
				first_name: 'Mike',
				last_name: 'bull',
				email: 'mike@patient.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 13,
				password: '1234',
				role: 'patient'
			}, {
				provider: 'local',
				first_name: 'Osmond',
				last_name: 'Toro',
				email: 'osmond@patient.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 24,
				password: '1234',
				role: 'patient'
			},
			{
				provider: 'local',
				first_name: 'peter',
				last_name: 'parker',
				email: 'peter@doc.com',
				organization_name:'ABC Inc',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 23,
				npi:1234567890,
				password: '1234',
				role: 'physician'
			}, {
				provider: 'local',
				first_name: 'Rolla',
				last_name: 'Russian',
				email: 'rolla@doc.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 1,
				npi:1234567891,
				password: '1234',
				role: 'physician'
			}, {
				provider: 'local',
				first_name: 'Cedrilla',
				last_name: 'Rose',
				email: 'cedrilla@doc.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 2,
				npi:1234567892,
				password: '1234',
				role: 'physician'
			}, {
				provider: 'local',
				role: 'admin',
				first_name: 'Super',
				last_name: 'Admin',
				email: 'admin@appointerx.com',
				password: 'admin'
			}], {
				returning: true
			})
			.then((users) => {
				console.log('finished populating users');
			});
	});