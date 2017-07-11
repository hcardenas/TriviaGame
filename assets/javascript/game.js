
// 20 questions and answers where array[0] is question
// array[1-4] are questions and array[5] is the answer
var questions_arr = [
 	["In Ocarina of Time, who is the Sage of Light?", 
 	"Zelda", "Rauru", "Sheik", "Link", "2"],

	["In the Legend of Zelda Twilight Princess, what is Link's hometown?", 
	"the Twilight Realm", "Hyrule", "Ordon", "Kakariko Village", "4"],

	["How many years passed between Ocarina of Time and Twilight Princess", 
	"It was never completley determined", "a century", "a decade", "a millenia", "2"],

	["In The Legend of Zelda Ocarina of Time, what is the very first song you learn?", 
	"Zelda's Lullaby", "Song of Storms", "Prelude of Light", "Melody of Shadow", "1"],

	["What year did the very first Legend of Zelda game come out?", 
	"2006", "1918", "1988", "1986", "4"],

	["In The Legend of Wind Waker the Triforce of Courage was spilt into how many pieces?", 
	"7", "8", "20", "3", "2"],

	["How many (and which) zelda games were released for the Nintendo DS/DSi?", 
	"2 - Phantom Houglass, Spirit Tracks", 
	"5 - Twilight Princess, Majora's Mask, Minish Cap, Oracle of Seasons, Oracle of Ages", 
	" 1 - The Legend of Zelda", "none", "4"],

	["What year was The Legend of Zelda Ocarina of Time remade for Gamecube?", 
	"2005", "2004", "2003", "2002", "4"],

	["In The Legend of Zelda Four Swords Adventures, what colors are Link's tunics?", 
	"they are all Green, DUH!", "Lime, Crimson, Perrywinkle, Gold", 
	"Yellow, Orange, White, Pink", "Green, Red, Blue, Purple", "4"],

	["In The Legend of Zelda Ocarina of Time (after the Master Sword has been drawn) you explore the Ice Cavern in Zora's Fountain to find what extremley useful item?",
	 "Hookshot", "Bow and Arrow", "Iron Boots", "Boomerang", "3"],

	["What inspired Shigeru Miyamoto to create The Legend of Zelda???",
	 "exploring caves by lantern light as a child", "learning the ways of the sword in his younger days", 
	 "he just thought of it and dedicated his life to making it a reality", "all the above", "4"],

	["Which Zelda game was supposedly first in chronological order?",
	 "Twilight Princess", "Skyward Sword", "Ocarina of Time", "Majora's Mask", "2"],

	["Which Zelda game was supposedly second in chronological order?",
	 "Twilight Princess", "Skyward Sword", "Ocarina of Time", "Phantom Hourglass", "4"],

	["What was the first dungeon in the Ocarina of Time?",
	 "Din's Cavern", "The Great Deku Tree", "Goron City", "Hyrule Castle", "2"],

	["How many different tunics could you wear in Ocarina of Time?",
	 "1", "2", "3", "4", "3"],

	["What item did you receive in the third dungeon in of Ocarina of time?",
	 "Bombs", "Navi voice canceller", "Bow and Arrow", "Boomerand", "4"],

	["In Twilight Princess, what animal can Link turn into?",
	 "Wolf", "Monkey", "Horse", "Fish", "1"],

	["What was Zelda in Skyward Sword?",
	 "Princess", "Link's childhood friend", "no one of importance", "none of the above", "2"],

	["What was the name of the boss in the Fire Temple of Ocarina of Time?",
	 "Fire demon", "Depth Charge", "Volvagia", "King Dodongo", "3"],

	["There are three parts of the Triforce: Power, Wisdom, and what?",
	 "Spirit", "valor", "Courage", "None of the above", "3"]
];

// arrays of gif to display
var win_gif = ["win1.gif", "win2.gif", "win3.gif", "win4.gif", "win5.gif", "win6.gif", "win7.gif"];
var lose_gif = ["lose1.gif", "lose2.gif",  "lose4.gif", "lose5.gif", "lose6.gif", "lose7.gif"];

var win_arr_len = win_gif.length -1;
var lose_arr_len = lose_gif.length-1;


// global variables to be used 
var used_question = [];
var max_games = 11;
var number = 25;
var bar_number = 0;
var correct_answer;
var current_question;
var current_question_answer;

// variables to keep track of wins/loses
var number_of_correct_answers;
var number_of_incorrect_answers;
var number_of_unanswered_questions;

// Id for the intervals
var intervalId;
var proggress_bar_id;

var global_flag= true;

// **********************************
// loads the initial divs into the screen
// **********************************
$( document ).ready(function() {
    initial_screen();
});

// **********************************
// when the button is clicked it chooses 
// wether it won or not
// **********************************
$("#game_div").on("click", ".butt_id" ,    function(){
	
	if (this.value === correct_answer) {
		
		number_of_correct_answers++; 
		clearInterval(intervalId);
	    clearInterval(proggress_bar_id);
		mid_screen("win");
	} 
	else {
		number_of_incorrect_answers++;
		clearInterval(intervalId);
	    clearInterval(proggress_bar_id);
		mid_screen("lose");
	}

});

// **********************************
// adds divs and a button to the start 
// of the game
// **********************************
function initial_screen() {
	var center_button = $("<div class='column-md-4 text-center'>");
	var button_start = $("<button id='center' type='button' class='btn btn-primary pad_id' onclick='start_game()''>").text("Start Game.");
	center_button.append(button_start);
	$("#game_div").empty();
	$("#game_div").append(center_button);
}

// **********************************
// sets the goblal variables and starts the game
// **********************************
function start_game() {

	used_question = [];
	max_games = 11;
	number_of_correct_answers = 0;
	number_of_incorrect_answers = 0;
	number_of_unanswered_questions = 0;
	restart_globals();


	run_game();
}

// **********************************
// this functions is called when the user
// clicks a button. it then choses a random
// gif and displays to screen
// **********************************
function mid_screen(flag) {
	
	// clears screen
	$("#game_div").empty();
	var outter_div = $("<div class='column-md-4 text-center'>");

	// picks a tittle depending on win/lose/unasnwered
	var tittle;
	if (flag === "win")
		tittle = $("<h3>").text("You're Correct!!! " );
	else if (flag === "lose") 
		tittle = $("<h3>").text("You lose ... the answer was number " + correct_answer + ": " + current_question_answer );
	else 
		tittle = $("<h3>").text("You left it Unanswered.... " );

	// picks a win depending on win/lose
	var gif_div = $('<img src='+ random_gif(flag) +' style="width:304px;height:228px;">');

	// appends to screen
	outter_div.append(tittle);
	outter_div.append(gif_div);
	$("#game_div").append(outter_div);

	setTimeout(run_game, 1000 * 2);
}

// **********************************
// choses arandom question
// populates variables with answers and questions
// then it creates the questiosn buttons and questiosn to display
// to screen
// **********************************
function new_question() {
	// captures div to final_div and clears the screen
	var final_div = $("#game_div");
	final_div.empty();

	// gets random question and sets variables with answers
	var question = random_question();
	correct_answer = question[5];
	current_question = question[0];
	current_question_answer = question[correct_answer];
	console.log("question number: " + max_games + " " + question);

	restart_globals();

	// makes the tittle for the progress bar
	var time_rem = $("<h3>").html("Time Remaining: <b><span id='time_remaining'>25</span>!</b>");

	// makes the progress bar
	var progress_bar = $("<div id='pad_progess_bar' class='progress'>");
	var bar = $('<div id="p_bar" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">');
	var span_text = $("<span class='sr-only'>").text("45% complete");
	bar.append(span_text)
	progress_bar.append(bar);

	// makes the divs for the questions with buttons
	var question_div = $("<div id='question' class='text-center'>").html("<h3>" + question[0] + "</h3>");
	var answers_div = $('<div id="answers" class="text-center">');
	var answers_div_1 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='1'>").text(question[1]);
	var answers_div_2 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='2'>").text(question[2]);
	var answers_div_3 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='3'>").text(question[3]);
	var answers_div_4 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='4'>").text(question[4]);

	// appends everything to screen

	answers_div.append(answers_div_1);
	answers_div.append(answers_div_2);
	answers_div.append(answers_div_3);
	answers_div.append(answers_div_4);
	
	final_div.append(time_rem);
	final_div.append(progress_bar);
	final_div.append(question_div);
	final_div.append(answers_div);	
}

// **********************************
// picks a random questions and makes sure
// that it doesnt repeat
// **********************************
function random_question() {
	var question_number;
	do {
		// picks random question
		question_number = Math.floor(Math.random()*questions_arr.length);

		// makes sure we didnt already used it
		if (used_question.indexOf(question_number) === -1) {
			used_question.push(question_number);
			return questions_arr[question_number];
		}
	} while (true);
}

// **********************************
// runs the timmers with the progress bar
// also it ends the game when we run 10 questions
// **********************************
function run_game() {

	if (--max_games > 0) {

		new_question();
	  	intervalId = setInterval(decrement,   1000);
	  	proggress_bar_id = setInterval(fill_bar, 250);

	 }
	 else {
	 	clearInterval(intervalId);
	    clearInterval(proggress_bar_id);
	 	end_game();	 	
	 }
}


// **********************************
// end game screen with button to restart
// **********************************
function end_game() {
	// creates divs and titles with win/loses stats
	var outter_div = $("<div class='column-md-4 text-center'>");
	var inner_h3 = $("<h3>").text("All done, heres how u did:");
	var inner_p1 = $("<p>").text("Correct Answers: " + number_of_correct_answers);
	var inner_p2 = $("<p>").text("Incorrect Answers: " + number_of_incorrect_answers);
	var inner_p3 = $("<p>").text("Unanswered questions: " + number_of_unanswered_questions);
	var button = $("<button id='center' type='button' class='btn btn-primary pad_id' onclick='start_game()''>").text("Start Over!");

	// appends to screen
	outter_div.append(inner_h3);
	outter_div.append(inner_p1);
	outter_div.append(inner_p2);
	outter_div.append(inner_p3);
	outter_div.append(button);

	// clears screen before putting everything
	$("#game_div").empty();
	$("#game_div").append(outter_div);
}

// **********************************
// used to make the progress bar dill
// **********************************
function fill_bar() {
	if (bar_number <= 100 && global_flag){
		bar_number+= 1.02;
		$("#p_bar").attr("style" , "width: " + bar_number + "%;");
	} 
} 

// **********************************
// this is run every second in order to make 
// the tittle decrease
// **********************************
function decrement() {
	if (number !== 0 && global_flag) {
		  number--;
		  //  Show the number in the tag.
		  $("#time_remaining").html(number);

	 } else { 
	    clearInterval(intervalId);
	    clearInterval(proggress_bar_id);
	    number_of_unanswered_questions++;
	    mid_screen("Unanswered");

	  }
}

// **********************************
// basic reset globals
// **********************************
function restart_globals() {
	global_flag = true;
	number = 25;
	bar_number = 0;
}

// **********************************
// picks a random gif depending on win/lose
// but always sends the same gif if unaswered
// **********************************
function random_gif(flag) {
	if (flag === "win"){
		//return "assets/images/win/" + win_gif[Math.floor(Math.random()*win_gif.length)];
		if (win_arr_len < 0) {
			win_arr_len = win_gif.length -1;
		}

		return "assets/images/win/" + win_gif[win_arr_len--]; 


	}
	else if (flag === "lose"){
		//return "assets/images/lose/" + lose_gif[Math.floor(Math.random()*lose_gif.length)];
		if (lose_arr_len < 0) {
			lose_arr_len = lose_gif.length - 1;
		}
		console.log(lose_arr_len);
		return "assets/images/lose/" + lose_gif[lose_arr_len--];
	}
	else 
		return "assets/images/lose/lose3.gif"
}
