ProductService = function (){
	this.subsciptionName = 'bh-products';
}

ProductService.prototype.publish = function(){
	Meteor.publish(this.subsciptionName, this.publishProducts);
}

ProductService.prototype.subscribe = function(){
	Meteor.subscribe(this.subsciptionName);
}

ProductService.prototype.add = function(){
	return true;
}

ProductService.prototype.edit = function(){
	return true;
}

ProductService.prototype.remove = function(){
}

ProductService.prototype.changePricingOptions = function(){
	
}

ProductService.prototype.publishProducts = function(user){
	
}