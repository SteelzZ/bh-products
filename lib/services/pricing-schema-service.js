PricingSchemaService = function (){
    this.subsciptionName = 'bh-pricing-schemas';
}

PricingSchemaService.prototype.publish = function(){
	Meteor.publish(this.subsciptionName, this.publishPricingSchemas);
}


PricingSchemaService.prototype.subscribe = function(){
	Meteor.subscribe(this.subsciptionName);
}

PricingSchemaService.prototype.publishPricingSchemas = function(user){
	var result = user ? PricingSchemasCollection.find({}) : null;
	return result;
}

PricingSchemaService.prototype._update = function(id, updates, callback){
	var update = {};

	_.each(updates, function(item){
		if(!(item.action in update)){
			update[item.action] = {};
		} 
		update[item.action][item.path] = ite.value;
	});

	if(!('$set' in update)){
		update['$set'] = {};
	}

	update['$set']["updatedAt"] = new Date();
	var result = PricingSchemasCollection.update(
		{_id:id}, 
		update,
		callback
	);
	return result;
}

PricingSchemaService.prototype.add = function(name, schema, status, callback){
	var pricingSchema = {
		name: name,
		schema: schema,
		status: status,
		createdAt: new Date(),
        updatedAt: new Date()
	};
	var result = PricingSchemasCollection.insert(pricingSchema, callback);
	return result;
}

PricingSchemaService.prototype.remove = function(id, callback){
	var result = PricingSchemasCollection.remove(
		{_id:id},
		callback
	);
	return result;
}

PricingSchemaService.upsertCurrency = function(currency, callback){
	var self = this;
	var allSchemas = PricingSchemasCollection.find({});
	// We can't update multi documents from client
	allSchemas.forEach(function(schema){
		var update = {
			action : '$set',
			path: 'schema.'+currency,
			value: "0.00"
		};
		self._update(schema._id, [update]);
	});

	return true;
}

PricingSchemaService.prototype.removeCurrency = function(currency, callback){
	var self = this;
	var allSchemas = PricingSchemasCollection.find({});
	allSchemas.forEach(function(schema){
		var update = {
			action : '$unset',
			path: 'schema.'+currency,
			value: ""
		};
		self._update(schema._id, [update]);
	});

	return true;
}

PricingSchemaService.prototype.updateCurrencyValue = function(id, currency, value, callback){
	var update = {
		action : '$set',
		path: 'schema.'+currency,
		value: value
	};
	return self._update(id, [update], callback);
}

PricingSchemaService.prototype.updateName = function(id, name, callback){
	var update = {
		action : '$set',
		path: 'name',
		value: name
	};
	return self._update(id, [update], callback);
}

PricingSchemaService.getPrice = function(name, currency){
    var result = PricingSchemasCollection.findOne({name:name});
    return new Price(result[currency], currency);
}

PricingSchemaService.getPricingSchema = function(id){
    var result = PricingSchemasCollection.findOne(
    	{_id:id}
    );
    return result;
}