# concept extractor

*This script is experimental stuff*. It uses [keyword-miner](https://github.com/mateogianolio/keyword-miner) to extract the most frequently used keywords from a website and [concept-net](https://github.com/Planeshifter/node-concept-net) to associate the keywords to a concept/keyword you specify.

It results in a list of keywords with a corresponding weight that roughly represents the word's similarity to the specified concept.

```bash
# install
$ npm install mateogianolio/concept-extractor
$ npm test
```

>  This work includes data from ConceptNet 5, which was compiled by the Commonsense Computing Initiative. ConceptNet 5 is freely available under the Creative Commons Attribution-ShareAlike license (CC BY SA 3.0) from http://conceptnet5.media.mit.edu. The included data was created by contributors to Commonsense Computing projects, contributors to Wikimedia projects, Games with a Purpose, Princeton University's WordNet, DBPedia, OpenCyc, and Umbel.

#### Example (from `test.js`)

```javascript
var extract = require('concept-extractor');

// the options object is the same format as in keyword-miner
var options = {
  site: 'https://en.wikipedia.org/wiki/Data_mining',
  limit: 10,
  element: 'body' // only extract keywords from the "body" element
};

function done(error, results) {
  if (error)
    throw error;

  // results contains an array of objects like this:
  // { word: 'software', weight: 0.8768781818186884 }
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
```

Output for the concept `computer_science`:

```
results:
[ { word: 'software', weight: 0.8768781818186884 },
  { word: 'mining', weight: 0 },
  { word: 'data', weight: 0.549747883288543 },
  { word: 'machine', weight: 0.3341132075367523 },
  { word: 'learning', weight: 0 },
  { word: 'conference', weight: 0 },
  { word: 'knowledge', weight: 0.15239643485924595 },
  { word: 'information', weight: 0.2516386427849485 },
  { word: 'discovery', weight: 0.08791355407164494 },
  { word: 'analysis', weight: 0.3324896054503274 } ]
---
maximum weight: 0.8768781818186884
```

Output for the concept `mathematics`:

```
results:
[ { word: 'mining', weight: 0 },
  { word: 'learning', weight: 0 },
  { word: 'analysis', weight: 0.5252067463151946 },
  { word: 'conference', weight: 0.022289074816239547 },
  { word: 'software', weight: 0.16668583972978826 },
  { word: 'knowledge', weight: 0.1031308909706193 },
  { word: 'machine', weight: 0.022998221696578863 },
  { word: 'discovery', weight: 0.10574254835077147 },
  { word: 'data', weight: 0.03327238213471822 },
  { word: 'information', weight: 0 } ]
---
maximum weight: 0.5252067463151946
```

Output for the concept `economics`:

```
results:
[ { word: 'learning', weight: 0 },
  { word: 'analysis', weight: 0.2115613784875437 },
  { word: 'conference', weight: 0 },
  { word: 'data', weight: 0.026387914962943407 },
  { word: 'machine', weight: 0.049241795454380406 },
  { word: 'mining', weight: 0 },
  { word: 'discovery', weight: 0.056693457235950984 },
  { word: 'software', weight: 0.10938039014364835 },
  { word: 'knowledge', weight: 0.059521765646348854 },
  { word: 'information', weight: 0 } ]
---
maximum weight: 0.2115613784875437
```

Output for the concept `physics`:

```
results:
[ { word: 'learning', weight: 0 },
  { word: 'software', weight: 0 },
  { word: 'mining', weight: 0 },
  { word: 'analysis', weight: 0 },
  { word: 'machine', weight: 0 },
  { word: 'discovery', weight: 0 },
  { word: 'information', weight: 0 },
  { word: 'knowledge', weight: 0 },
  { word: 'conference', weight: 0 },
  { word: 'data', weight: 0 } ]
---
maximum weight: 0
```

I do believe that with some improvements this could prove really useful for text categorization/classification.

### Contribute

This was pretty much hacked together in a day so it could probably be improved in a hundred different ways. If you know one, don't hesitate to send a PR or submit an issue.
