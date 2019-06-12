/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// helper function to get the time difference between two unix timestamp
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

function loadTweets() {
  const tweetsURL = 'http://localhost:8080/tweets';
  $.getJSON(tweetsURL, (tweets) => {
    renderTweets(tweets);
  });
}

$(document).ready(function() {

  loadTweets();

  // event listener on submit button
  $('#submit-tweet').on('submit', (event) => {
    event.preventDefault();
    console.log($('#submit-tweet').serialize());
  })

});
