(function () {
  'use strict';

  var mine = require('keyword-miner'),
      conceptNet = require('concept-net')(null, null, '5.4');

  function associate(options, category, done) {
    mine(options, function (error, keywords) {
      if (error)
        return done(error);

      var weights = [];
      keywords.forEach(function (keyword) {
        conceptNet.association(
          '/c/en/' + keyword.word,
          { filter: '/c/en/' + category },
          function (error, result) {
            if (error)
              return done(error);

            var weight = result
              .similar
              // we don't want to include negations in the resulting weight
              .filter(function (tuple) {
                return tuple[0].indexOf('/neg') === -1;
              })
              .map(function (tuple) {
                return tuple[1];
              })[0] || 0;

            weights.push({
              word: keyword.word,
              weight: weight
            });

            // done
            if (weights.length === keywords.length)
              done(null, weights);
          }
        );
      });
    });
  }

  module.exports = associate;
}());
