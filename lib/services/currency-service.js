CurrencyService = function(){
	this.subsciptionName = 'bh-currencies';
}

CurrencyService.prototype.add = function(code, name, isBase, callback){
	check(code, String);
	check(name, String);
	check(isBase, Boolean);

	try{
		var currency = {_id: code, name: name, isBase: isBase};
		var id = CurrenciesCollection.insert(currency, callback);
		if(id && isBase){
			this.setAsBase(code);
		}
		return id;
	} catch(e){
	    // Ball on MongoDB side
		// https://jira.mongodb.org/browse/SERVER-3069 will get fixed one day
		if (e.name !== 'MongoError') {
			throw e;
		}

	    var match = e.err.match(/^E11000 duplicate key error index: ([^ ]+)/);
	    if (!match){
	    	throw e;
	    }

	    // If code exists already return it
	    if (match[1].indexOf('$_id') !== -1){
	    	throw new Meteor.Error("Currency with code ["+code+"] already exists!");
	    } 
	    	
	    throw e;
	}
}

CurrencyService.prototype.setAsBase = function(code){
	// We can not do multiple updates on client, so to avoid putting this code
	// in server method we do it like this
	var result = null;
	var baseCurrency = CurrenciesCollection.findOne({isBase:true},{fields:{_id:1}});
	if(baseCurrency){
		result = CurrenciesCollection.update(
			{_id : baseCurrency._id},
			{$set : {isBase : false}}
		);
	}
	
	result = CurrenciesCollection.update(
		{_id : code},
		{$set : {isBase : true}}
	);

	return (result === 1);
}

CurrencyService.prototype.remove = function(code, callback){
	var result = CurrenciesCollection.remove({_id:code}, callback);
	return (result === 1);
}

CurrencyService.prototype.getBaseCurrency = function(){
	return CurrenciesCollection.findOne({isBase:true});
}

CurrencyService.prototype.getCurrencies = function(){
	return CurrenciesCollection.find({});
}

CurrencyService.prototype.publishCurrencies = function(user){
	var result = user ? CurrenciesCollection.find({}) : null;
	return result;
}

CurrencyService.prototype.publish = function(){
	Meteor.publish(this.subsciptionName, this.publishCurrencies);
}

CurrencyService.prototype.subscribe = function(){
	var self = this;
	Meteor.startup(function(){
		Meteor.subscribe(self.subsciptionName, Meteor.userId());
	})
}