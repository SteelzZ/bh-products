if(Meteor.isServer){
	Meteor.methods({
		'currency-service-test/cleanup' : function(){
			CurrenciesCollection.remove({});
			Meteor.users.remove({_id:Meteor.userId()});
		}
	});
}

Tinytest.add('CurrencyService - Meteor.Error is thrown if code param is not string', function (test) {
	var currencyService = new CurrencyService();
	test.throws(function(){
		currencyService.add();
	});
});

Tinytest.add('CurrencyService - Meteor.Error is thrown if name param is not string', function (test) {
	var currencyService = new CurrencyService();
	test.throws(function(){
		currencyService.add("LTU", 1);
	});
});

Tinytest.add('CurrencyService - Meteor.Error is thrown if isBase param is not boolean', function (test) {
	var currencyService = new CurrencyService();
	test.throws(function(){
		currencyService.add("LTU", "", "q");
	});
});

if(Meteor.isClient){
	// Clean up before test in case test fails 
	testAsyncMulti('CurrencyService - Test if on client operations on currency service only allowed for logged in users', [
		function (test, expect) {
	        Meteor.call('currency-service-test/cleanup');
	    },
	    function(test, expect){
			var currencyService = new CurrencyService();
			currencyService.add("EUR", "Euro", true, expect(function(err, doc){
	    		test.instanceOf(err, Meteor.Error);
		    	test.equal(err.error, 403);
	    	}));
		},
		function (test, expect) {
	        Meteor.call('currency-service-test/cleanup');
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
			var currencyService = new CurrencyService();
			var id = currencyService.add("LTL", "Litas", true);
			test.equal("LTL", id);
		},
		function (test, expect) {
	        Meteor.call('currency-service-test/cleanup');
	    }
	]);
}

if(Meteor.isServer){
	Tinytest.add('CurrencyService - On server currency document id is returned on successful insertion', function (test) {
		var currencyService = new CurrencyService();
		var id = currencyService.add("LTL", "Litas", true);
		test.equal("LTL", id);
		Meteor.call('currency-service-test/cleanup');
	});

	Tinytest.add('CurrencyService - If base currency already exists and new base currency is inserted, old one should be set to false', function (test) {
		var currencyService = new CurrencyService();
		currencyService.add("LTL", "Litas", true);
		currencyService.add("EUR", "Euro", true);
		currencyService.add("GBP", "Pound", true);
		test.equal("GBP", CurrenciesCollection.findOne({isBase:true})._id);
	});
}