/* ============================================
===============================================
Authors & copyright: (c) 2016 LemaxDigital.com | bingoCardsGenerator.js - MIT License
===============================================
=============================================== */

/* -----------Get a new number -- START--------------- */
function getNewNumber() {
	var x = Math.floor((Math.random() * 90) + 1),
	markedNumber = [];
	markedNumber.push(x);
	document.getElementById("displayedNumberText").innerHTML = x;
	$("#markedNumber").append(", "+markedNumber);
}
/* -----------Get a new number  -- END--------------- */

$(document).ready(function(){	
	
	/* -----------Display data on the page -- START--------------- */
	// Get the Card String. Set as a string so it is easier to split it.
	var cardString = "011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985";
	
	// Split the Card String into six bingo cards.
	var	bingoCards = 	[[]];
		
	// Adding + 2 to the substring parameter, so that every time it loops, it gets the right numbers to extract.
	var k = 0,
		l = 2,
		m = 1;
			
	// Create a loop that will loop into each bingo cards (it will loop 6 times as there are 6 bingo cards).
	for(var i = 0; i < 6; i++){
		bingoCards.push([]); // Create the array at this stage is efficient in case one day we want 10 and not 6 bingo cards to be created.
		// Then at every two digits, extract those numbers and push it into one of the bingo card card array (it will loop 15 times as each bingo card is made up of 15 numbers).					
		for(var j = 0; j < 15; j++){			
			var converted = cardString.substring(k, l);
			// Change the value back to a number so we do not have 01 but 1 as it is required.
			add = parseInt(converted);				
			bingoCards[i].push(add);	
			// Write the extracted value into the HTML bingo card data cell
			$("#btc"+m).text(add);				
			k += 2;	
			l += 2; 
			m += 1;
		}	 
	}
	/* -----------Display data on the page -- END--------------- */
	
	/* -----------Add animations -- START--------------- */
	// Select data cell animation
	$("td[id^='btc']").click(function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");		
		}else{			
			$(this).addClass("selected");
		}
	});
	
	// Count down and change stats
	$(".stats").addClass("fifteenToGo");
	var	mainCountDown = $("table").find("td.selected").size(),
		mainCount = 15 - mainCountDown;
	$("table").find("span.statsText").text(mainCount + " TO GO");
	
	$("td[id^='btc']").css("cursor", "pointer");
	
	$("td[id^='btc']").click(function(){
		var	countDown = $(this).parents("table").find("td.selected").size(),
			count = 15 - countDown;
		$(this).parents("table").find("span.statsText").text(count + " TO GO");
		
		if(count < 16 && count > 10){
				$(this).parents("table").find("td.stats").removeClass("tenToGo fiveToGo bingo");				
				$(this).parents("table").find("td.stats").addClass("fifteenToGo");
		}else if(count < 11 && count > 5){
				console.log("10 to go");
				$(this).parents("table").find("td.stats").removeClass("fifteenToGo fiveToGo bingo");				
				$(this).parents("table").find("td.stats").addClass("tenToGo");
		}else if(count < 6 && count > 0){
				$(this).parents("table").find("td.stats").removeClass("tenToGo tenToGo bingo");				
				$(this).parents("table").find("td.stats").addClass("fiveToGo");
		}else{
				$(this).parents("table").find("td.stats").removeClass("fifteenToGo tenToGo fiveToGo");				
				$(this).parents("table").find("td.stats").addClass("bingo");
				$(this).parents("table").find("span.statsText").text("BINGO!");				
		}
	});
	
	/* -----------Add animations -- END----------------- */

	/* ----------- navigation click actions------------- */	
	$('.scroll-link').on('click', function(event){
		event.preventDefault();
		var sectionID = $(this).attr("data-id");
		scrollToID('#' + sectionID, 750);
	});
	// scroll function
	function scrollToID(id, speed){
		var offSet = 90;
		var targetOffset = $(id).offset().top - offSet;
		$('html,body').animate({scrollTop:targetOffset}, speed);
	}
});