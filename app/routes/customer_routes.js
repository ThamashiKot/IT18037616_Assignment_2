//const customerRoutes = require('./customer_routes');
var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){
    //customerRoutes(app, db);



	app.get('/customer/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('customer').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});


	app.delete('/customer/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('customer').remove(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Customer ' + id + ' deleted!');
			}
		});
	});


	app.put('/customer/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		const focusCustomer = { firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address, contact: req.body.contact };
		db.collection('customer').replaceOne(details, focusCustomer, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});


    app.post('/customer', (req, res) => {
        const customer = { firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address, contact: req.body.contact };
		db.collection('customer').insert(customer, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Added successfully');
                // res.send(result.ops[0]);
			}
		});
		
    //we are creating a customer here
      //  res.send('Hello')
	});
}


