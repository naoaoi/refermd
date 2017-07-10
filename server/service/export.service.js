// var xlsx  = require('node-xlsx');


exports.exportToFile = function(req, res) {

	var export_type = req.params.type || 'json';
	var title = req.params.title || 'export';
	console.log(title)
	var filename = title + '.csv';
	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('content-type', 'text/csv');

	JSON.parse(req.body.data)
		.forEach(function(row) {
			res.write('"' + row.join('","') + '"');
			res.write('\r\n');
		});
	res.end('');


	// if(export_type === 'json') {
	//     var json = JSON.parse(req.body.data)
	//     var filename = title+'.json';
	//     var mimetype = 'application/json';
	//     res.setHeader('Content-Type', mimetype);
	//     res.setHeader('Content-disposition','attachment; filename='+filename);
	//     res.send( json );

	// }

	// if(export_type == 'xlsx') {
	//     res.setHeader('Content-disposition', 'attachment;filename=' + title + '.xlsx');
	//     res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

	//     var xlsx_data = [];

	//     // overview
	//     xlsx_data.push({
	//         name: title,
	//         data: JSON.parse(req.body.data)
	//     });

	//     // build
	//     var buffer = xlsx.build (xlsx_data);
	//     res.write(buffer);


	//     res.end('');
	// }
	// else 
	// if (export_type == 'csv') {
	// 	var filename = title + '.csv';
	// 	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	// 	res.setHeader('content-type', 'text/csv');

	// 	JSON.parse(req.body.data)
	// 		.forEach(function(row) {
	// 			res.write('"' + row.join('","') + '"');
	// 			res.write('\r\n');
	// 		});
	// 	res.end('');
	// } else {
	// 	res.status(404);
	// }
};