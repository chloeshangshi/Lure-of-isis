jQuery(document).ready(function ($) {
  "use strict";
    

    
  
  var mn = $("nav.navbar"),
    mns = "main-nav-scrolled",
    hdr = $(".navbar-holder").offset().top;
  
  $(window).on("resize", function () {
    hdr = $(".navbar-holder").offset().top;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > hdr) {
      mn.addClass(mns);
    } else {
      mn.removeClass(mns);
    }
  });
  
    
  $("a").on("click", function(evt){
      
      if($(this).attr("href").substr(0,1) === "#"){
          evt.preventDefault();
          $("html,body").animate({"scrollTop": $($(this).attr("href").toString()).offset().top}, {queue:false, duration: 800, easing:"easeInOutQuint"});
      }
      
  })
  
  //store breakPoints for each quiz question
  var breakPoints = [];
  
  
  if($("section.quiz-question").length > 0){
  
    //dot styling
    var navDots = $("<nav />")
      .attr("id","bubbleNav")
      .css({"visibility":"hidden"})
      .append($("<ul />"))
      .appendTo("body");

    var dot = $("<li />");
    
    $(".quiz-explanation").css({"visibility":"hidden"});

    $(".check-answer-button").on("click", function(){
        
      $(this).parentsUntil(".quiz-question").find(".quiz-explanation").css({"visibility":"visible"});
      
      var checked = $(this).parentsUntil(".quiz-question").find(".form input:checked");
      
      checked.each(function(i,e){
        
        
        if($(this).data("correct") == true){
          if($(this).next("label").has("span").length === 0)
            $(this).next("label").append(' <span class="glyphicon glyphicon-ok"></span>');
        } else {
          if($(this).next("label").has("span").length === 0)
            $(this).next().append(' <span class="glyphicon glyphicon-remove"></span>');
        }
      })
      
    })
    
    
    $("section.quiz-question").each(function(i, e){
      navDots.find("ul").append(dot.clone());
    });
    
    

    
    //log breakpoints
    $(window).on("resize load", function(evt){
      breakPoints.length = 0;
      $("section.quiz-question").each(function(i, e){
        breakPoints.push($(e).offset().top);
      });
    });
    
    $(window).on("scroll load", function(e){
        
        
      //hide nav dots when you're not scrolled to that section
      if($(window).scrollTop() > $(".quiz-question").eq(0).offset().top - 50){
          $("#bubbleNav").css({"visibility":"visible"});
      } else {
          $("#bubbleNav").css({"visibility":"hidden"});
      }
        
      //
      var i, y=0, s=$(window).scrollTop()+50;
      for(i=0; i < breakPoints.length; i++){
        if(s >= breakPoints[i])
          y=i;
      }
      $("#bubbleNav li").removeClass("selected").eq(y).addClass("selected");
    })
    
    $("#bubbleNav li").on("click", function(evt){
      var whichOne = $("#bubbleNav li").index(this);
      $("html,body").stop().animate({"scrollTop":breakPoints[whichOne] + "px"}, {duration:800, queue:false, easing: "easeInOutQuint"});
    })
      
  }

  jQuery.extend(jQuery.easing, { easeInOutQuint:function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f * f + a;
		}
		return h / 2 * ((f -= 2) * f * f * f * f + 2) + a;
      }
  });
  
});

