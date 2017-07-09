
// 20 questions and answers 
var questions_arr = [
 	["question 1", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 2", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 3", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 4", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 5", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 6", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 7", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 8", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 9", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 10", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 11", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 12", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 13", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 14", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 15", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 16", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 17", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 18", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 19", "answer1", "answer2", "answer3", "answer4", "4"],
	["question 20", "answer1", "answer2", "answer3", "answer4", "4"]
];

var win_gif = ["win1.gif", "win2.gif", "win3.gif", "win4.gif"];
var lose_gif = ["lose1.gif", "lose2.gif", "lose3.gif", "lose4.gif"];

var used_question = [];
var max_games = 11;
var number = 25;
var bar_number = 0;
var correct_answer;
var current_question;
var current_question_answer;

var number_of_correct_answers;
var number_of_incorrect_answers;
var number_of_unanswered_questions;

var intervalId;
var proggress_bar_id;

var global_flag= true;

// **********************************
// **********************************
$( document ).ready(function() {
    initial_screen();
});

// **********************************
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
// **********************************
function initial_screen() {
	var center_button = $("<div class='column-md-4 text-center'>");
	var button_start = $("<button id='center' type='button' class='btn btn-primary pad_id' onclick='start_game()''>").text("Start Game.");
	center_button.append(button_start);
	$("#game_div").empty();
	$("#game_div").append(center_button);
}

// **********************************
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
// **********************************
function mid_screen(flag) {
	

	$("#game_div").empty();
	var outter_div = $("<div class='column-md-4 text-center'>");
	var tittle;
	if (flag === "win")
		tittle = $("<h3>").text("You're Correct!!! " );
	else if (flag === "lose") 
		tittle = $("<h3>").text("You lose ... the answer was number " + correct_answer + ": " + current_question_answer );
	else 
		tittle = $("<h3>").text("You left it Unanswered.... " );

	var gif_div = $('<img src='+ random_gif(flag) +' style="width:304px;height:228px;">');

	outter_div.append(tittle);
	outter_div.append(gif_div);
	$("#game_div").append(outter_div);

	setTimeout(run_game, 1000 * 2);
}

// **********************************
// **********************************
function new_question() {
	console.log("question number: " + max_games);

	var final_div = $("#game_div");
	final_div.empty();
	var question = random_question();
	correct_answer = question[5];
	current_question = question[0];
	current_question_answer = question[correct_answer];
	console.log("question number: " + max_games + " " + question);
	restart_globals();


	var time_rem = $("<h3>").html("Time Remaining: <b><span id='time_remaining'>25</span>!</b>");


	var progress_bar = $("<div id='pad_progess_bar' class='progress'>");
	var bar = $('<div id="p_bar" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">');
	var span_text = $("<span class='sr-only'>").text("45% complete");
	bar.append(span_text)
	progress_bar.append(bar);


	var question_div = $("<div id='question' class='text-center'>").html("<h3>" + question[0] + "</h3>");
	var answers_div = $('<div id="answers" class="text-center">');
	var answers_div_1 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='1'>").text(question[1]);
	var answers_div_2 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='2'>").text(question[2]);
	var answers_div_3 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='3'>").text(question[3]);
	var answers_div_4 = $("<button type='button' class='btn btn-warning btn-lg butt_id' value='4'>").text(question[4]);

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
// **********************************
function random_question() {
	var question_number;
	do {
		question_number = Math.floor(Math.random()*questions_arr.length);
		if (used_question.indexOf(question_number) === -1) {
			used_question.push(question_number);
			return questions_arr[question_number];
		}
	} while (true);
}

// **********************************
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
// **********************************
function end_game() {
	var outter_div = $("<div class='column-md-4 text-center'>");
	var inner_h3 = $("<h3>").text("All done, heres how u did:");
	var inner_p1 = $("<p>").text("Correct Answers: " + number_of_correct_answers);
	var inner_p2 = $("<p>").text("Incorrect Answers: " + number_of_incorrect_answers);
	var inner_p3 = $("<p>").text("Unanswered questions: " + number_of_unanswered_questions);
	var button = $("<button id='center' type='button' class='btn btn-primary pad_id' onclick='start_game()''>").text("Start Over!");

	outter_div.append(inner_h3);
	outter_div.append(inner_p1);
	outter_div.append(inner_p2);
	outter_div.append(inner_p3);
	outter_div.append(button);

	$("#game_div").empty();

	$("#game_div").append(outter_div);
}

// **********************************
// **********************************
function fill_bar() {
	if (bar_number <= 100 && global_flag){
		bar_number+= 1.02;
		$("#p_bar").attr("style" , "width: " + bar_number + "%;");
	} 
} 

// **********************************
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
// **********************************
function restart_globals() {
	global_flag = true;
	number = 25;
	bar_number = 0;
}

function random_gif(flag) {
	if (flag === "win")
		return "assets/images/win/" + win_gif[Math.floor(Math.random()*win_gif.length)];
	else if (flag === "lose")
		return "assets/images/lose/" + lose_gif[Math.floor(Math.random()*lose_gif.length)];
	else 
		return "assets/images/lose/lose3.gif"
	


}
