var mongoose = require('mongoose');
var CONFIG = require('../config.js');
var db;

db = mongoose.createConnection(CONFIG.dbUrl);

// Get customer schema and model
var CustomerSchema = require('../models/customer.js').CustomerSchema;
var Customer = db.model('customer', CustomerSchema);

exports.index = function(req, res) {
	// Query Mongo for polls, just get back the question text
	Customer.find({name: "mongoose"}, {}, function(error, customer) {
		// res.json(customer);
		// console.log(customer);
		res.render('index', {customer: customer});
	});
};

exports.getCustomer = function(req, res) {
	Customer.find({}, {}, function(error, customer) {
		res.json(customer);
	});
};

exports.getCustomerByPhone = function(req, res) {
	// console.log(req.params.phone);
	Customer.find({phone: req.params.phone}, {}, function(error, customer) {
		res.json(customer);
	});
};

exports.saveCustomer = function(req, res) {
	var reqbody = req.body;
	console.log(reqbody);
	// customerObj = {id: 1, name: reqbody.name, phone: reqbody.phone, weichat: reqbody.weichat, date: [{appointment: "2014-10-11", contact: "2014-10-8"}], note: reqbody.note};
	// var customer = new Customer(customerObj);

	// Save updates to DB
	Customer.findOneAndUpdate({phone: reqbody.phone}, {name: reqbody.name, phone: reqbody.phone, weichat: reqbody.weichat, date: [{appointment: "2014-10-11", contact: "2014-10-8"}], note: reqbody.note}, function(err, doc) {
		if(err || !doc) {
			throw 'Error';
		} else {
			res.send("update successfully");
			// res.json(doc);
		}		
	});
};

exports.create = function(req, res) {
	var reqBody = req.body,
	
	// Build up poll object to save
	customerObj = {id: 1, name: "杨小姐", phone: "514-549-3316", weichat: 21431549, date: [{appointment: "2014-10-11", contact: "2014-10-8"}], note: "100天男宝宝，169套餐"};
	console.log(req.body);	

	//TODO: get last id in the db

	// Create poll model from built up poll object
	var customer = new Customer(customerObj);
	
	// Save poll to DB
	customer.save(function(err, doc) {
		if(err || !doc) {
			throw 'Error';
		} else {
			res.send("create successfully");
			// res.json(doc);
		}		
	});
};