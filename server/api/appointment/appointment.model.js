'use strict';

export default function(sequelize, DataTypes) {
	return sequelize.define('Appointment', {
			_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			className: DataTypes.STRING,
			start: {
				type: DataTypes.DATE,
				//defaultValue: sequelize.NOW,//sequelize.fn('NOW')
			},
			end: {
				type: DataTypes.DATE,
				//defaultValue: sequelize.NOW//sequelize.fn('NOW')
			},
			icon: DataTypes.STRING,
			allDay: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			isHoliday:{
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			status:{
				type:   DataTypes.ENUM,
				values: ['Awaiting', 'Cancel', 'Done'],
				defaultValue: 'Awaiting',
				allowNull: false
			}
		}, {
			hooks: {
				beforeCreate: function(event, options, fn) {
					console.log('====================called==================');
					console.log(event.start);
					console.log('====================called==================');
					if (!event.start) {
						event.start = getDateTime(0);
					}
					if (!event.end) {
						event.end = getDateTime(1);
					}

					fn(null, event);
				},
				beforeBulkCreate: function(events, fields, fn) {
					events.forEach(function(event) {
						if (!event.start || !event.start.length || (event.start === null)) {
							event.start = getDateTime(0);
						}
						if (!event.end || !event.end.length || (event.end === null)) {
							event.end = getDateTime(1);
						}
						return fn();
					});
				}
			}
		}

	);
}


function getDateTime(span) {
	var now = new Date();
	var tz_offset = (new Date()).getTimezoneOffset() * 60 * 1000; // get TZ offset in milliseconds
	var now = new Date(now - tz_offset); // now corrected

	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hour = now.getHours() + span;
	var minute = now.getMinutes();
	var second = now.getSeconds();
	if (month.toString().length == 1) {
		var month = '0' + month;
	}
	if (day.toString().length == 1) {
		var day = '0' + day;
	}
	if (hour.toString().length == 1) {
		var hour = '0' + hour;
	}
	if (minute.toString().length == 1) {
		var minute = '0' + minute;
	}
	if (second.toString().length == 1) {
		var second = '0' + second;
	}
	var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
	return dateTime;
}