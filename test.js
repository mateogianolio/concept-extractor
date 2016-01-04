(function () {
  'use strict';

  var extract = require('./extract');
  var options = {
    site: 'https://en.wikipedia.org/wiki/Data_mining',
    limit: 10
  };

  console.log('comparing the content of', options.site);
  console.log('to the concept "computer_science":');
  console.log();

  function done(error, results) {
    if (error)
      throw error;

    var weights = results
      .map(function (result) {
        return result.weight;
      });

    console.log('results:');
    console.log(results);
    console.log('---');
    console.log('maximum weight:', Math.max.apply(null, weights));
    console.log();
  }

  extract(options, 'computer_science', done);
}());
