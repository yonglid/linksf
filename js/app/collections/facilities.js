var Parse       = require('parse');
var _           = require('underscore');
var Facility    = require('cloud/models/facility');

var Facilities = Parse.Collection.extend({
  model: Facility
});

var instance = new Facilities();
module.exports = { instance: instance };