$(document).ready(function() {

  // --- our code goes here ---
  $("textarea").on("input", function() {
    const span_in_form = $(this).parent("form").find("span");
    span_in_form.text(140 - this.value.length);

    if(this.value.length > 140){
      span_in_form.addClass("red");
    }
    else{
      span_in_form.removeClass("red");
    }
  });

});
