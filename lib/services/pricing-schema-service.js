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
	
}