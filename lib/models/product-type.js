ProductType = function(document){
    _.extend(this, document);
};

ProductType.prototype = {
    constructor: ProductType
}

ProductTypesCollection = new Meteor.Collection("bh-product-types", {
    transform: function(document){
        return new ProductType(document)
    }
});

ProductTypesCollection.allow({
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