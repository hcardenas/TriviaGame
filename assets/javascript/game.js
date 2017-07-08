
// 20 questions and answers 
var questions_arr = [
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[]
];

var used_number = [];
var max_games = 10;
var number = 25;
var bar_number = 0;
var intervalId;
var proggress_bar_id;

var global_flag= false;




function run() {
	setup();
  	intervalId = setInterval(decrement,   1000);
  	proggress_bar_id = setInterval(fill_bar, 250);
}


function fill_bar() {
	if (bar_number <= 100 && global_flag){
		bar_number+= 1.02;
		console.log(bar_number);
		$("#p_bar").attr("style" , "width: " + bar_number + "%;");

	} else {
		clearInterval(proggress_bar_id);
		global_flag = false;
	}

} 


function decrement() {
  
if (number !== 0 && global_flag) {
	  number--;
	  //  Show the number in the tag.
	  $("#time_remaining").html(number);

 } else { 
    clearInterval(intervalId);
    global_flag = false;
  }
}


function setup() {
	global_flag = true;
	used_number = [];
	set_qustions();
}

function set_qustions() {
	var random_number;
	do {
		random_number = Math.Floor(Math.random() * questions_arr.length);

	} while (used_number.indexOf(random_number) === -1);

	used_number.push(random_number);

	$("#question").html("<h2>" + questions_arr[random_number][0] + "</h2>");
	for (var i = 1; i < questions_arr[random_number].length; i++) {
		$("#answers ")questions_arr[random_number][i]
	}

}

run();