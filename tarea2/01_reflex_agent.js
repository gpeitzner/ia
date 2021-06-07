// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

function active_state(states, i) {
	if (states_visited[i] === false) {
		document.getElementById("states_visited").innerHTML += "<br>State: "
			.concat(states[0])
			.concat(" | ")
			.concat(states[1])
			.concat(" | ")
			.concat(states[2]);
		states_visited[i] = true;
	}
}

function verify_state(states) {
	if (states[0] === "A") {
		if (states[1] === "CLEAN" && states[2] === "CLEAN") {
			active_state(states, 0);
		}
		if (states[1] === "DIRTY" && states[2] === "CLEAN") {
			active_state(states, 1);
		}
		if (states[1] === "CLEAN" && states[2] === "DIRTY") {
			active_state(states, 2);
		}
		if (states[1] === "DIRTY" && states[2] === "DIRTY") {
			active_state(states, 3);
		}
	} else if (states[0] === "B") {
		if (states[1] === "CLEAN" && states[2] === "CLEAN") {
			active_state(states, 4);
		}
		if (states[1] === "DIRTY" && states[2] === "CLEAN") {
			active_state(states, 5);
		}
		if (states[1] === "CLEAN" && states[2] === "DIRTY") {
			active_state(states, 6);
		}
		if (states[1] === "DIRTY" && states[2] === "DIRTY") {
			active_state(states, 7);
		}
	}
}

function test(states) {
	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);
	document.getElementById("log").innerHTML += "<br>Location: "
		.concat(location)
		.concat(" | Action: ")
		.concat(action_result);
	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	} else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";
	if (Math.random() > 0.5) {
		if (states[0] === "A") {
			states[2] = "DIRTY";
		} else {
			states[1] = "DIRTY";
		}
	}
	document.getElementById("states").innerHTML += "<br>State: "
		.concat(states[0])
		.concat(" | ")
		.concat(states[1])
		.concat(" | ")
		.concat(states[2]);
	verify_state(states);
	var all_states_visited = true;
	for (let i = 0; i < states_visited.length; i++) {
		const state_visited = states_visited[i];
		if (state_visited === false) {
			all_states_visited = false;
			break;
		}
	}
	if (all_states_visited === false) {
		setTimeout(function () {
			test(states);
		}, 2000);
	}
}

var states = ["A", "DIRTY", "DIRTY"];
var states_visited = [false, false, false, false, false, false, false, false];
/*
	states_visited[0] -> A | CLEAN CLEAN
	states_visited[1] -> A | DIRTY CLEAN
	states_visited[2] -> A | CLEAN DIRTY
	states_visited[3] -> A | DIRTY DIRTY
	states_visited[4] -> B | CLEAN CLEAN
	states_visited[5] -> B | DIRTY CLEAN
	states_visited[6] -> B | CLEAN DIRTY
	states_visited[7] -> B | DIRTY DIRTY
*/
test(states);
