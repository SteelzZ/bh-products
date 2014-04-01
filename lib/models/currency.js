Currency = function(document){
    _.extend(this, document);
};

Currency.prototype = {
    constructor: Currency
}

CurrenciesCollection = new Meteor.Collection("bh-currencies", {
    transform: function(document){
        return new Currency(document)
    }
});

CurrenciesCollection.allow({
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