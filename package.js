Package.describe({
  summary: "Package that let's you manage products."
});

Package.on_use(function (api, where) {
	api.add_files('lib/models/currency.js', ['client', 'server']);
	api.add_files('lib/models/product-type.js', ['client', 'server']);
	api.add_files('lib/models/price.js', ['client', 'server']);
	api.add_files('lib/models/pricing-schema.js', ['client', 'server']);
	api.add_files('lib/models/product.js', ['client', 'server']);
	api.add_files('lib/services/pricing-schema-service.js', ['client', 'server']);
	api.add_files('lib/services/product-service.js', ['client', 'server']);
	api.add_files('lib/services/currency-service.js', ['client', 'server']);
	api.add_files('lib/bh-products.js', ['client', 'server']);

	// To get started with
	// Default base implementation
	api.export('Products', ['client', 'server']);

	// For advanced usage
	// Exports everything that is needed to extend package
	// bh-leet-products package is sample extension of this base package
	api.export('BhProducts', ['client', 'server']);

	api.export('ProductService', ['client', 'server']);
	api.export('CurrencyService', ['client', 'server']);
	api.export('PricingSchemaService', ['client', 'server']);

	api.export('Price', ['client', 'server']);
	api.export('Product', ['client', 'server']);
	api.export('ProductsCollection', ['client', 'server']);
	api.export('Currency', ['client', 'server']);
	api.export('CurrenciesCollection', ['client', 'server']);
	api.export('ProductType', ['client', 'server']);
	api.export('ProductTypesCollection', ['client', 'server']);
	api.export('PricingSchema', ['client', 'server']);
	api.export('PricingSchemasCollection', ['client', 'server']);
});

Package.on_test(function (api) {
    api.use('bh-products', ['client', 'server']);

    api.use('tinytest', ['client', 'server']);
    api.use('test-helpers', ['client', 'server']);
    api.use('accounts-base', ['client', 'server']);
    api.use('accounts-password', ['client', 'server']);

    api.add_files('test/bh-products-test.js', ['client', 'server']);
    api.add_files('test/currency-service-test.js', ['client', 'server']);
    api.add_files('test/product-service-test.js', ['client', 'server']);
});
