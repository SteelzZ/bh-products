ProductService = function (){
	this.subsciptionName = 'bh-products';
}

ProductService.prototype.publish = function(){
	Meteor.publish(this.subsciptionName, this.publishProducts);
}

ProductService.prototype.subscribe = function(){
	Meteor.subscribe(this.subsciptionName);
}

ProductService.prototype._update = function(id, updates, callback){
	var update = {};

	_.each(updates, function(item){
		if(!(item.action in update)){
			update[item.action] = {};
		} 
		update[item.action][item.path] = item.value;
	});

	if(!('$set' in update)){
		update['$set'] = {};
	}

	update['$set']["updatedAt"] = new Date();
	var result = ProductsCollection.update(
		{_id:id}, 
		update,
		callback
	);
	return result;
}

ProductService.prototype.add = function(type, name, pricingOptions, fields, images, status, callback){
	check(type, String);
	check(name, String);

	var product = {
		type: type,
		name: name,
		pricingOptions: pricingOptions,
		fields : fields,
		images : images,
		status: status,
		createdAt: new Date(),
        updatedAt: new Date()
	};
	var productId = ProductsCollection.insert(product, callback);
	return productId;
}

ProductService.prototype.changeName = function(id, name, callback){
	var update = {
		action : '$set',
		path: 'name',
		value: name
	};
	return this._update(id, [update], callback);
}

ProductService.prototype.changeType = function(id, type, callback){
	var update = {
		action : '$set',
		path: 'type',
		value: type
	};
	return this._update(id, [update], callback);
}

ProductService.prototype.upsertFields = function(id, fields, callback){
	var updates = [];
	_.each(fields, function(field){
		updates.push({
			action : '$set',
			path: 'fields.'+field.path,
			value: field.value
		});
	});
	return this._update(id, updates, callback);
}

ProductService.prototype.removeFields = function(id, fields, callback){
	var updates = [];
	_.each(fields, function(field){
		updates.push({
			action : '$unset',
			path: 'fields.'+field.path,
			value: ""
		});
	});
	return this._update(id, updates, callback);
};

ProductService.prototype.upsertImages = function(id, images, callback){
	var updates = [];
	_.each(fields, function(field){
		updates.push({
			action : '$set',
			path: 'images.'+field.path,
			value: field.value
		});
	});
	return this._update(id, updates, callback);
}

ProductService.prototype.removeImages = function(id, images, callback){
	var updates = [];
	_.each(fields, function(field){
		updates.push({
			action : '$unset',
			path: 'images.'+field.path,
			value: ""
		});
	});
	return this._update(id, updates, callback);
};

ProductService.prototype.remove = function(id, callback){
	var result = ProductsCollection.remove({_id:id}, callback);
	return result;
}

ProductService.prototype.publishProducts = function(user){
	var result = user ? ProductsCollection.find({}) : null;
	return result;
}