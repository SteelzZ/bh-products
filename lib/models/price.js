Price = function(value, currency){
    this.value = value;
    this.currency = currency;
};

Price.prototype.format = function(){
	return this.value + " " + this.currency;
}