var $ = require('jquery'),
    _ = require('underscore');

var location = function(hasGeolocation) {
  var lat, lon;

  if ( hasGeolocation ) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    }, function(error) {
      console.log(error);
    });
  } else {
    // for local development
    lat = 37.782355;
    lon = -122.409825;
  }

  return {lat: lat, lon: lon};
};

var dumpToDOM = function(results) {
  var resDiv = $('#results');
  resDiv.empty();
  resDiv.append("results available at $('#results').data('results')\n\n");

  results.forEach(function(fac) {
    fac.set("services",
      _.map(fac.get('services'), function(s) { return s.attributes; } )
      );
    resDiv.append(JSON.stringify(fac, null, '  '));
    resDiv.append("\n");
  });
  resDiv.data('results', results);
};

var queryFunction = function(runWhere) {
  if ( runWhere === 'cloud' ) {
    return _.partial(Parse.Cloud.run, "browse");
  } else {
    return require('lib/browse');
  }
};

var submit = function(params) {
  // choose where to run the query
  var query = queryFunction(params.runwhere);

  // add location if proximity sorting
  if ( params.sort === 'near' ) {
    // false until we start testing geolocation
    $.extend(params, location(false));
  }

  query(params, {
    success: function(result) {
      dumpToDOM(result);
    }, error: function(err) {
      console.error(err);
    }
  });
};

module.exports = { submit: submit };
