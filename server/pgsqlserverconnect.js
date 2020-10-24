const { Client } = require('pg');
const info = require('./psgsqlinfo.env');

exports.client = new Client(info.config);

