var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
	$.getJSON(prefix + quoteUrl, createTweet);
}

function createTweet(input) {
	var data = input[0];
	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;
	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if(!quoteAuthor.length) {
		quoteAuthor = "Unknow author";
	}
	
	if (tweetText.lenght > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
}
	

$(document).ready(function() {
	getQuote();
	$('.trigger').on('click', function() {
		getQuote();
	})
});

$.ajaxSetup({ cache: false });