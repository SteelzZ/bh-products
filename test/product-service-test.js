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
	// Clean up before test in case test fails 
	testAsyncMulti('ProductService - Test if on client operations on product service only allowed for logged in users', [
		function (test, expect) {
	        Meteor.call('product-service-test/cleanup');
	    },
	    function(test, expect){
			var productService = new ProductService();
			productService.add("type", "my-product", {}, {}, {}, 'active', expect(function(err, doc){
	    		test.instanceOf(err, Meteor.Error);
		    	test.equal(err.error, 403);
	    	}));
		},
		function (test, expect) {
	        Meteor.call('product-service-test/cleanup');
	    },
		function (test, expect) {
	        var username = Random.id();
	        var password = 'password';

	        Accounts.callLoginMethod({
	            methodName: 'createUser',
	            methodArguments: [{username: username, password: password}]
	        });
	    },
		function(test, expect){
			var productService = new ProductService();
			var id = productService.add("type", "my-product", {}, {}, {}, 'active');
			test.isNotNull(id);
			productService.changeType(id, 'my-type');
			var product = ProductsCollection.findOne({_id:id});
			test.equal('my-type', product.type);

			productService.changeName(id, 'updated-product-name');
			product = ProductsCollection.findOne({_id:id});
			test.equal('updated-product-name', product.name);

			productService.upsertFields(id, [
				{
					path : 'description',
					value: 'My product description'
				},
				{
					path : 'another',
					value: 'Other field value'
				},
			]);
			product = ProductsCollection.findOne({_id:id});
			test.isNotNull(product.fields.description);
			test.isNotNull(product.fields.another);
			test.isUndefined(product.fields.doesnotexists);

			productService.removeFields(id, [
				{
					path : 'another'
				},
			]);
			product = ProductsCollection.findOne({_id:id});
			test.isNotNull(product.fields.description);
			test.isUndefined(product.fields.another);

		},
		function (test, expect) {
	        Meteor.call('product-service-test/cleanup');
	    }
	]);
}

if(Meteor.isServer){

}