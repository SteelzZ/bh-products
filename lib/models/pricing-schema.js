PricingSchema = function(document){
    _.extend(this, document);
};

PricingSchema.prototype = {
    constructor: PricingSchema
}

PricingSchemasCollection = new Meteor.Collection("bh-pricing-schemas", {
    transform: function(document){
        return new PricingSchema(document)
    }
});

PricingSchemasCollection.allow({
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