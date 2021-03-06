import $ from 'jquery';
import { Space } from "./space.js";
import { Board } from "./board.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var board = new Board();

var turn = "x";

// Assign 9 spaces to board
for (var i = 0; i < 9; i++) {
  var newSpace = new Space();
  board.addSpace(newSpace);
}

// Show X on spaces
function showMark(id) {
  var spaceX = board.findSpace(id);
  if (turn === "x") {
    $("#coord" + spaceX.coord).text("X");
  } else {
    $("#coord" + spaceX.coord).text("O");
  }
}

var xValues = [];
var oValues = [];

function valueArray() {
  for (var i = 1; i < 10; i++) {
    if (board.findSpace(i).value === "x" && !xValues.includes(board.findSpace(i).id)) {
      xValues.push(board.findSpace(i).id);
    } else if (board.findSpace(i).value === "o" && !oValues.includes(board.findSpace(i).id)) {
      oValues.push(board.findSpace(i).id);
    }
  }
}

var coords = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];

function attachContactListeners() {

  for (var i = 0; i < 9; i++) {
    $("div.col-md-4").on("click", "p#coord" + coords[i], function() {
      if (!this.coord) {
        var coord = this.id.slice(5);
        this.coord = coord;
        var space11 = board.findSpace(coords.indexOf(coord) + 1);
        space11.addCoord(coord);
        showMark((coords.indexOf(coord)) + 1);
        var value = "";
        if (turn === "x") {
          value = "x";
        } else {
          value = "o";
        }
        this.value = value;
        space11.addValue(value);
      } else {
        alert("That space is already taken!!!!");
      }
      valueArray();
      winnerIs();

    });

  }

}

function winnerIs() {
  var winPositions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];
  for (var i = 0; i < 8; i++) {
    if (xValues.includes(winPositions[i][0]) && xValues.includes(winPositions[i][1]) && xValues.includes(winPositions[i][2])) {
      $(".winnerX").show();
      $("#game-board").hide();
    } else if (oValues.includes(winPositions[i][0]) && oValues.includes(winPositions[i][1]) && oValues.includes(winPositions[i][2])) {
      $(".winnerO").show();
      $("#game-board").hide();
    }

  }
}

$(document).ready(function() {
  attachContactListeners();

  $("form#game-board").click(function(event) {
    event.preventDefault();
    if (turn === "x") {
      turn = "o";
    } else {
      turn = "x";
    }
  });
});
