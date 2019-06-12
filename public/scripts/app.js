/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed / 1000) + ' seconds ago...';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed / msPerMinute) + ' minutes ago...';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed / msPerHour ) + ' hours ago...';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago...';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago...';
    }

    else {
        return Math.round(elapsed / msPerYear ) + ' years ago...';
    }
}

function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((tweet) => {
    $('#tweets-container').append(createTweetElement(tweet))
  });
}

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');

  let $header = $('<header>').append($('<img>').addClass('avatar').attr('src', tweet.user.avatars.small))
                             .append($('<span>').addClass('name').text(tweet.user.name))
                             .append($('<span>').addClass('username').text(tweet.user.handle))
                             .appendTo($tweet);

  let $article = $('<article>').text(tweet.content.text)
                               .appendTo($tweet);

  let $footer = $('<footer>').text(timeDifference(new Date(), tweet.created_at))
                             .append('<i class="fas fa-heart"></i> <i class="fas fa-retweet"></i> <i class="fas fa-flag"></i>')
                             .appendTo($tweet);

  return $tweet;
}

$(document).ready(function() {
  renderTweets(data);
});
