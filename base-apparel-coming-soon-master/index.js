const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


$("button").click(function() {
    var email = $("input").val();

if(emailRegex.test(email)) {
    $("div.input-container").after("<div class = 'email-validation josefin-sans-medium' style = 'color : green ; padding : 10px ; opacity : 50%'>Valid email.</div>");
}

else {
    $(".error-icon").css('display', 'block');
    $(".error-icon").css('visibility', 'visible');
    $("div.input-container").after("<div class = 'email-validation josefin-sans-medium' style = 'color : red ; padding : 10px ; opacity : 50%'>Invalid email!</div>");

}
    });

$(document).keypress(function (event) {
if(event.key === "Enter") {
    var email = $("input").val();

    if(emailRegex.test(email)) {
        $("div.input-container").after("<div class = 'email-validation josefin-sans-medium' style = 'color : green ; padding : 10px ; opacity : 50%'>Valid email.</div>");
    }
    
    else {
        $(".error-icon").css('display', 'block');
        $(".error-icon").css('visibility', 'visible');
        $("div.input-container").after("<div class = 'email-validation josefin-sans-medium' style = 'color : red ; padding : 10px ; opacity : 50%'>Invalid email!</div>");
    
    }  
}
});

$("input").click(function () {
 $("div.email-validation").hide();
 $(".error-icon").css('display', 'none');
    $(".error-icon").css('visibility', 'hidden'); 
});

$(document).keydown(function(event) {
    if (event.key === "Backspace") {
        // Remove validation message and error icon when input is empty
        $("div.email-validation").hide();
        $(".error-icon").css('display', 'none');
        $(".error-icon").css('visibility', 'hidden');
    }
});
