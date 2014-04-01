/*****************************/
/*         Stubs             */
/*****************************/
function CustomPricingSchemaService(){}

CustomPricingSchemaService.prototype = new PricingSchemaService();
CustomPricingSchemaService.prototype.constructor = PricingSchemaService;

function CustomCurrencyService(){}

CustomCurrencyService.prototype = new CurrencyService();
CustomCurrencyService.prototype.constructor = CurrencyService;

function CustomProductService(){}

CustomProductService.prototype = new ProductService();
CustomProductService.prototype.constructor = ProductService;

/*****************************/
/*         Facade tests      */
/*****************************/
Tinytest.add('Check required API', function (test) {
	// Order maters :) - fix it so it wouldnt
	test.equal(
		Object.keys(BhProducts.prototype), 
		[
			// BhProducts
			"subscribe", "publish",

			// Product service
			"addProduct", "editProduct", "removeProduct", 

			// Currency service
			"addPricingSchema", "getCurrencies"
		]
	);  
});

Tinytest.add('Throws Meteor.Error exception if passed services does not match required interface', function (test) {
	test.throws(function(){
		new BhProducts();
	});
});

Tinytest.add('Check if passed services are registered', function (test) {
	var bhProducts = new BhProducts(new ProductService(), new CurrencyService(), new PricingSchemaService());

	test.instanceOf(bhProducts.productService, ProductService);
	test.instanceOf(bhProducts.currencyService, CurrencyService);
	test.instanceOf(bhProducts.pricingSchemaService, PricingSchemaService);
});




































