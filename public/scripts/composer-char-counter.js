$(document).ready(function() {

  // --- our code goes here ---
  $("textarea").on("input", function() {
    const spanInForm = $(this).parent("form").find("span");
    spanInForm.text(140 - this.value.length);

    if(this.value.length > 140){
      spanInForm.addClass("red");
    }
    else{
      spanInForm.removeClass("red");
    }
  });

});
