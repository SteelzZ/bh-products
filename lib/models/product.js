Product = function(document){
    _.extend(this, document);
};

Product.prototype = {
    constructor: Product
}

ProductsCollection = new Meteor.Collection("bh-products", {
    transform: function(document){
        return new Product(document)
    }
});

ProductsCollection.allow({
    insert: function (userId, doc) {
        // the user must be logged in
        return userId;
    },
	update: function (userId, doc, fields, modifier) {
        // the user must be logged in
        return userId;
	},
	remove: function (userId, doc) {
        // the user must be logged in
        return userId;
	},
});