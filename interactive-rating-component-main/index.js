var rating;

$(".rating").click(function() {
    $(this).addClass("active");
    rating = $(this).text();
});


$(".submit").click(function() {

$("img").attr("src" , "./images/illustration-thank-you.svg");
$("img").addClass("thank-you");

$(".image").css("align-self", "center");
$(".image").css("height", "100%");
$(".image").css("width", "100%");
$(".image").css('background-color', '');

$(".ty-rating").css('display', 'block');
$(".ty-rating").css('visibility', 'visible');
$(".ty-rating").text("You selected " +rating+ " out of 5");


$("h1").text("Thank you!");
$("p").text("We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch");


$("div.numbers , button.submit").hide();
$("h1, p").css("text-align", "center");

});