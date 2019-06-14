"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet, (err) => {
          if (err) {
            return callback(err);
          }
        });
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          callback(null, tweets.sort(sortNewestFirst));
        });
      });
    },

    // Update a tweet that is liked by someone
    likeTweet: function(id, trueOrFalse, callback) {
      simulateDelay(() => {
        let liked = trueOrFalse === 'true' ? -1 : 1;
        db.collection("tweets").update(
          { _id: require("mongodb").ObjectId(id)}, { "$inc": { "likes": liked } },
          (err) => {
            if(err) {
              return callback(err);
            }
          }
        );
        callback(null);
      });
    }

  };
}
