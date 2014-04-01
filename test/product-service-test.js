if(Meteor.isServer){
	Meteor.methods({
		'product-service-test/cleanup' : function(){
			ProductsCollection.remove({});
			Meteor.users.remove({_id:Meteor.userId()});
		}
	});
}

Tinytest.add('ProductService - Meteor.Error is thrown if type param is not string', function (test) {
	var service = new ProductService();
	test.throws(function(){
		service.add();
	});
});

Tinytest.add('ProductService - Meteor.Error is thrown if name param is not string', function (test) {
	var service = new ProductService();
	test.throws(function(){
		service.add("type");
	});
});

if(Meteor.isClient){

}

if(Meteor.isServer){

}