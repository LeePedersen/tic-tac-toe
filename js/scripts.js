//Business logic for Board----------
//create an empty board that takes an array of space objects that hold data
function Board() {
  this.spaces = [];
  this.currentId = 0;
}

//Add space to board
Board.prototype.addSpace = function(space) {
  space.id = this.assignId();
  this.spaces.push(space);
}

//Add id data to space when added to board
Board.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

//Create find contact method using object id to be used in UI logic.
Board.prototype.findSpace = function(id) {
  for (var i=0; i< this.spaces.length; i++) {
    if (this.spaces[i]) {
      if (this.spaces[i].id == id) {
        return this.spaces[i];
        }
      }
    };
  return false;
};

//Business logic for space objects ------------

//constructor for space object
function Space() {

}

Space.prototype.addCoord = function(coord) {
  this.coord = (coord);
}

Space.prototype.removeCoord = function(coord) {
  this.coord = null;
}

Space.prototype.addValue = function(value) {
  this.value = value;
}

//User interface logic --------
var board = new Board();

var turn = "x";

// Assign 9 spaces to board
for (i = 0; i < 9; i++) {
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

function hideMark(id) {
  var spaceeee = board.findSpace(id);
  $("#coord" + spaceeee.coord).text(".");
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
  console.log(xValues);
  console.log(oValues);
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
        if (turn === "x") {
          var value = "x";
        } else {
          var value = "o"
        }
        this.value = value;
        space11.addValue(value);
      } else {
        console.log("That space is already taken!!!!");

      }
      if (xValues.length > 3) {
        console.log(board.findSpace(xValues[0]).coord);
        board.findSpace(xValues[0]).coord = null;
        xValues.shift();
        hideMark(xValues[0]);
      }

      if (oValues.length > 3) {
        console.log(board.findSpace(oValues[0]).coord);
        board.findSpace(oValues[0]).coord = null;
        oValues.shift();
        hideMark(oValues[0]);
      }

      valueArray();
      winnerIs();

    });

  }

};

function winnerIs() {
  var winPositions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];
  for (var i = 0; i < 8; i++) {
    if (xValues.includes(winPositions[i][0]) && xValues.includes(winPositions[i][1]) && xValues.includes(winPositions[i][2])) {
      console.log("X wins");
      $(".winnerX").show();
      $("#game-board").hide();
    } else if (oValues.includes(winPositions[i][0]) && oValues.includes(winPositions[i][1]) && oValues.includes(winPositions[i][2])) {
      console.log("O wins");
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
    if (xValues.length > 4 || oValues.length > 4) {
      $(".existentialWinner").fadeIn(9000);
    }
    console.log(board);
  });
});
