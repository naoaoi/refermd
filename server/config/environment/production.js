'use strict';

// Production specific configuration
// =================================
module.exports = {
	// Server IP
	ip: process.env.OPENSHIFT_NODEJS_IP ||
		process.env.IP ||
		undefined,

	// Server port
	port: process.env.OPENSHIFT_NODEJS_PORT ||
		process.env.PORT ||
		8080,
	
	mysql: {
    	uri: process.env.CLEARDB_DATABASE_URL || 'mysql://root:Mehta@5418@localhost:3306/physician'    
	}
};