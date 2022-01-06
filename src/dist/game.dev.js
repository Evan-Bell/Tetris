"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board =
/*#__PURE__*/
function () {
  //USED TO INITIALIZE THE BOARD
  function Board(width, height) {
    var _this = this;

    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
    this.board = [];
    this.score = 0;
    this.level = 0;
    this.pivot = [];
    this.pieces = [2, 3, 4, 5, 6, 7, 8]; //tracks for tetris "random generator"

    this.coor = [[0, 0], [0, 0], [0, 0], [0, 0]];
    this.hold = 0;
    this.next = [0, 0, 0]; //stores next three not including one in play

    this.highlevel = 0;
    this.highscore = 0;
    this.droptime = 900;
    this.interval = setInterval(function () {
      _this.piece_fall();
    }, this.droptime);
    this.create_board();
  }

  _createClass(Board, [{
    key: "create_board",
    value: function create_board() {
      //CREATES BLANK 2D ARRAY OF GIVEN SIZE (HEIGHT AND WIDTH)
      var temp = [];

      for (var row = 0; row < this.height; row++) {
        temp[row] = [];

        for (var col = 0; col < this.width; col++) {
          temp[row][col] = 0; //0;
        }
      }

      this.board = temp;
      this.next_piece_grab();
      return this.board;
    }
    /*
    TYPES OF PIECES AND CODE VALUES ASSIGNED TO THEM = {
      EMPTY = 0
      GHOST/VISUALIZED = 1
      T = 2
      SQUARE = 3
      STRAIGHT LINE = 4
      NORMAL L = 5
      BACKWARDS L = 6
      LEFT Z = 7
      RIGHT Z = 8
      (ALL ABOVE ARE FOR PEICE THAT ARE PLACED)
      (FOR PIECES THAT ARE NOT PLACES, THE CODE WILL BE NEGATIVE THE NUMBER, SO UNPLACED T IS -1)
    }
    */

  }, {
    key: "gen_piece",
    value: function gen_piece(mutate, specific_piece) {
      //GENERATES A NEW PIECE
      var piece_codes = {
        //EACH PIECE HAS A NUMBER AS A KEY (COLOR AND PEICE INDETIFIER) AND A SET OF 4 COORDINATEES, AND A PIVOT POINT
        2: [[0, 0], [1, -1], [1, 0], [1, 1], [1, 0] // RELATIVE PIVOT POINT
        ],
        3: [[0, 0], [0, 1], [1, 0], [1, 1], [0.5, 0.5] //RELATIVE PIVOT POINT
        ],
        4: [[0, -1], [0, 0], [0, 1], [0, 2], [0.5, 0.5] //RELATIVE PIVOT POINT
        ],
        5: [[0, 1], [1, -1], [1, 0], [1, 1], [1, 0] //RELATIVE PIVOT POINT
        ],
        6: [[0, -1], [1, -1], [1, 0], [1, 1], [1, 0] //RELATIVE PIVOT POINT
        ],
        7: [[0, -1], [0, 0], [1, 0], [1, 1], [1, 0] //RELATIVE PIVOT POINT
        ],
        8: [[1, -1], [0, 0], [1, 0], [0, 1], [1, 0] //RELATIVE PIVOT POINT
        ]
      };

      if (this.pieces.length === 0) {
        //MAKES IT SO THAT EACH PIECE GETS GIVEN EVENLY
        this.pieces = [2, 3, 4, 5, 6, 7, 8];
      }

      this.pieces = this.pieces.sort(function () {
        return Math.random() - 0.5;
      });
      var piece_num = this.pieces.pop(this.pieces.length - 1); //GETS LAST INT FROM RANDOM SORT LIST

      if (specific_piece > 1) {
        piece_num = 1 * specific_piece;
      }

      if (mutate) {
        var piece = piece_codes[piece_num];

        for (var g = 0; g < 4; g++) {
          //SHIFTS THE PIECE OVER TO CENTER OF BOARD INSTEAD OF DEAD TOP
          this.board[piece[g][0] + 1][piece[g][1] + 4] = -piece_num;
        }

        this.pivot = piece[4];
        this.pivot[0] += 1;
        this.pivot[1] += 4; //MOVE THE PIVOT ACCORDINGLY WITH THE PIECE SHIFT ABOVE

        this.update_ghost();
      }

      return piece_num;
    }
  }, {
    key: "sleep",
    value: function sleep(ms) {
      //USED FOR FALLING TIMEOUT
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }
  }, {
    key: "piece_fall",
    value: function piece_fall() {
      //DROPS PIECE DOWN ONE
      var coor = this.update_coor(); //grabs Coordinates

      var flag = true;

      for (var i = 0; i < 4; i++) {
        var row = coor[i][0];
        var col = coor[i][1];

        if (row === this.height - 1 || this.board[row + 1][col] > 1) {
          flag = false;
        }
      }

      if (flag !== true) {
        this.solidify_piece();
        this.over_stack_check();
      } else {
        //REMOVES THE SPOT AT EACH OF COORDINATES AND ADDS ONE BELOW EACH COORDINATE
        var typ = this.board[coor[0][0]][coor[0][1]];

        for (var _i = 0; _i < 4; _i++) {
          this.board[coor[_i][0]][coor[_i][1]] = 0;
        }

        for (var _i2 = 0; _i2 < 4; _i2++) {
          this.board[coor[_i2][0] + 1][coor[_i2][1]] = typ;
        }

        this.pivot[0] += 1;
      }

      return flag;
    }
  }, {
    key: "update_coor",
    value: function update_coor() {
      var temp = [[], [], [], []];
      var counter = 0;

      for (var row = 0; row < this.height; row++) {
        for (var col = 0; col < this.width; col++) {
          if (this.board[row][col] < 0) {
            this.coor[counter][0] = row;
            this.coor[counter][1] = col;
            temp[counter][0] = row;
            temp[counter][1] = col;
            counter++;
          }
        }
      }

      return temp;
    }
  }, {
    key: "rotate_piece",
    value: function rotate_piece() {
      //ROTATES THE PIECE CLOCKWISE
      // Rules for rotation taken from here https://gamedev.stackexchange.com/questions/17974/how-to-rotate-blocks-in-tetris
      var coor = this.update_coor(); //grabs Coordinates
      //COVERT EACH POINT RELATIVE TO PIVOT then rotates and stores in new_coor

      var xPivot = this.pivot[0];
      var yPivot = this.pivot[1];
      var new_coor = coor.slice(); //copies but without same memory pointer

      for (var g = 0; g < 4; g++) {
        var temp = [0, 0];
        temp[0] = xPivot + (coor[g][1] - yPivot);
        temp[1] = yPivot + -(coor[g][0] - xPivot);
        new_coor[g] = temp;
      }

      var typ = this.board[coor[0][0]][coor[0][1]]; //Stores value to use for replacing same piece
      //REMOVES THE OLD COOR (NEW COOR IS STILL STORED, SO IT IS OK)

      for (var i = 0; i < 4; i++) {
        this.board[coor[i][0]][coor[i][1]] = 0;
      } //GENERATES COORDINATES AND PIV SHIFTED IN EVERY DIR


      var _this$shift_coor = this.shift_coor(new_coor, this.pivot, 1, 0),
          new_coor_down = _this$shift_coor.new_coor_down,
          new_piv_down = _this$shift_coor.new_piv_down;

      var _this$shift_coor2 = this.shift_coor(new_coor, this.pivot, -1, 0),
          new_coor_up = _this$shift_coor2.new_coor_up,
          new_piv_up = _this$shift_coor2.new_piv_up;

      var _this$shift_coor3 = this.shift_coor(new_coor, this.pivot, 0, -1),
          new_coor_left = _this$shift_coor3.new_coor_left,
          new_piv_left = _this$shift_coor3.new_piv_left;

      var _this$shift_coor4 = this.shift_coor(new_coor, this.pivot, 0, 1),
          new_coor_right = _this$shift_coor4.new_coor_right,
          new_piv_right = _this$shift_coor4.new_piv_right; //CHECKS THAT NEW POSSIBLE COOR ARE VALID


      if (this.coor_is_valid(new_coor)) {
        var throw_away;
      } else if (this.coor_is_valid(new_coor_down)) {
        new_coor = new_coor_down;
        this.pivot = new_piv_down;
      } else if (this.coor_is_valid(new_coor_left)) {
        new_coor = new_coor_left;
        this.pivot = new_piv_left;
      } else if (this.coor_is_valid(new_coor_right)) {
        new_coor = new_coor_right;
        this.pivot = new_piv_right;
      } else if (this.coor_is_valid(new_coor_up)) {
        new_coor = new_coor_up;
        this.pivot = new_piv_up;
      } else {
        //Sets old coor as new coor, so no change is made
        new_coor = coor;
      } //GO THROUGH AND REPLACE each coor WITH new_coor TO MAKE ROTATED PIECE


      for (var _i3 = 0; _i3 < 4; _i3++) {
        this.board[new_coor[_i3][0]][new_coor[_i3][1]] = typ;
      }

      this.update_ghost();
      return new_coor;
    }
  }, {
    key: "shift_coor",
    value: function shift_coor(Coordinates, piv, ver, hor) {
      //SHIFTS COOR IN A GIVEN DIR
      var shifted_coor = [];

      for (var i = 0; i < 4; i++) {
        var temp = [];
        temp[0] = Coordinates[i][0] + ver;
        temp[1] = Coordinates[i][1] + hor;
        shifted_coor[i] = temp;
      }

      var shifted_piv = [piv[0] + ver, piv[1] + hor];
      return [shifted_coor, shifted_piv];
    }
  }, {
    key: "shift_piece",
    value: function shift_piece(Coordinates, ver, hor) {
      //SHIFTS COOR IN A GIVEN DIR
      var typ = this.board[Coordinates[0][0]][Coordinates[0][1]];

      for (var i = 0; i < 4; i++) {
        this.board[Coordinates[i][0]][Coordinates[i][1]] = 0;
      }

      for (var _i4 = 0; _i4 < 4; _i4++) {
        this.board[Coordinates[_i4][0] + ver][Coordinates[_i4][1] + hor] = typ;
      }

      this.pivot[0] += ver;
      this.pivot[1] += hor;
      this.update_ghost();
    }
  }, {
    key: "coor_is_valid",
    value: function coor_is_valid(coors) {
      //CHECKS IF COOR IS VALID
      var flag = true;

      for (var i = 0; i < 4; i++) {
        var row = coors[i][0];
        var col = coors[i][1];

        if (row > this.board.length - 1 || row < 0 || col > this.board[0].length - 1 || col < 0) {
          flag = false;
          break;
        }

        var coor = this.board[row][col];

        if (coor > 1) {
          flag = false;
        }
      }

      return flag;
    }
  }, {
    key: "move_left",
    value: function move_left() {
      //CHECKS IF MOVE LEFT IS POSSIBLE, THEN DOES IT, OTHERWISE NOTHING
      var coor = this.update_coor(); //grabs Coordinates

      var new_coor = this.shift_coor(coor, this.pivot, 0, -1)[0];

      if (this.coor_is_valid(new_coor)) {
        this.shift_piece(coor, 0, -1);
      }
    }
  }, {
    key: "move_right",
    value: function move_right() {
      //CHECKS IF MOVE RIGHT IS POSSIBLE, THEN DOES IT, OTHERWISE NOTHING
      var coor = this.update_coor(); //grabs Coordinates

      var new_coor = this.shift_coor(coor, this.pivot, 0, 1)[0];

      if (this.coor_is_valid(new_coor)) {
        this.shift_piece(coor, 0, 1);
      }
    }
  }, {
    key: "move_drop",
    value: function move_drop() {
      var _this2 = this;

      //SCANS FOR PEICE, WHEN FOUND IT DOES PIECE_FALL() UNTIL PIECE NO LONGER EXISTS
      var check = this.piece_fall();
      this.score_increase(100);
      clearInterval(this.interval);
      this.interval = setInterval(function () {
        _this2.piece_fall();
      }, this.droptime);
      return check;
    }
  }, {
    key: "hard_drop",
    value: function hard_drop() {
      var diff = 0;
      var coor = this.update_coor();

      for (var row = 0; row < this.height; row++) {
        for (var col = 0; col < this.width; col++) {
          if (this.board[row][col] === 1) {
            //Used to add 2 points times level times the number of levels dropped
            diff = 2 * (row - coor[0][0] - 1);
            this.board[row][col] = this.board[coor[0][0]][coor[0][1]];
          }
        }
      }

      for (var i = 0; i < 4; i++) {
        this.board[coor[i][0]][coor[i][1]] = 1;
      }

      this.score_increase(diff * 100);
      this.solidify_piece();
      this.over_stack_check();
    }
  }, {
    key: "move_hold_swap",
    value: function move_hold_swap() {
      //SWAPS INTO HOLD
      var coor = this.update_coor();

      if (this.hold < 2) {
        this.hold = -this.board[coor[0][0]][coor[0][1]];

        for (var i = 0; i < 4; i++) {
          this.board[coor[i][0]][coor[i][1]] = 0;
        }

        this.next_piece_grab();
      } else {
        var temp = 1 * -this.board[coor[0][0]][coor[0][1]];

        for (var _i5 = 0; _i5 < 4; _i5++) {
          this.board[coor[_i5][0]][coor[_i5][1]] = 0;
        }

        this.gen_piece(true, this.hold);
        this.hold = 1 * temp; //copies without same memory
      }

      return this.hold;
    }
  }, {
    key: "next_piece_grab",
    value: function next_piece_grab() {
      if (this.next[0] === 0 || this.next[1] === 0) {
        for (var i = 0; i < 3; i++) {
          this.next[i] = this.gen_piece(false, 0);
        }
      }

      var next_piece = 1 * this.next[0];
      this.next = [this.next[1], this.next[2], this.gen_piece(false, 0)];
      this.gen_piece(true, next_piece);
      return next_piece;
    }
  }, {
    key: "solidify_piece",
    value: function solidify_piece() {
      var coor = this.update_coor();

      for (var i = 0; i < 4; i++) {
        this.board[coor[i][0]][coor[i][1]] *= -1;
      }

      this.line_cleared_check();
      this.next_piece_grab();
    }
  }, {
    key: "update_ghost",
    value: function update_ghost() {
      //removes old ghost tiles
      for (var row = 0; row < this.height; row++) {
        for (var col = 0; col < this.width; col++) {
          if (this.board[row][col] === 1) {
            this.board[row][col] = 0;
          }
        }
      } //PUTS THE GHOST piece in


      var coor = this.update_coor();
      var counter = 0;
      var ghost_dist = 0;
      var flag = true;

      while (flag) {
        counter++;

        for (var i = 0; i < 4; i++) {
          if (coor[i][0] + counter > this.board.length - 1) {
            flag = false;
          } else {
            var spot = this.board[coor[i][0] + counter][coor[i][1]];

            if (spot > 1) {
              flag = false;
            }
          }
        }

        if (flag) {
          ghost_dist++;
        }
      }

      for (var _i6 = 0; _i6 < 4; _i6++) {
        var _spot = this.board[coor[_i6][0] + ghost_dist][coor[_i6][1]];

        if (_spot === 0) {
          this.board[coor[_i6][0] + ghost_dist][coor[_i6][1]] = 1;
        }
      }

      return ghost_dist;
    }
  }, {
    key: "line_cleared_check",
    value: function line_cleared_check() {
      var rows_clear = [];

      for (var i = 0; i < this.board.length; i++) {
        var row_cleared = true;

        for (var j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] <= 1) {
            row_cleared = false;
          }
        }

        if (row_cleared) {
          rows_clear.push(i);
        }
      }

      var cleared_lines_len = rows_clear.length;
      this.score_increase(cleared_lines_len);

      for (var _i7 = 0; _i7 < cleared_lines_len; _i7++) {
        for (var _j = 0; _j < this.board[rows_clear[_i7]].length; _j++) {
          this.board[rows_clear[_i7]][_j] = 0;
        }
      }

      var row_cleared_max = Math.max.apply(Math, rows_clear);

      for (var _i8 = row_cleared_max; _i8 >= 0; _i8--) {
        for (var _j2 = 0; _j2 < this.board[_i8].length; _j2++) {
          if (this.board[_i8][_j2] > 1) {
            var counter = 0;

            for (var each = 0; each < cleared_lines_len; each++) {
              if (rows_clear[each] > _i8) {
                counter++;
              }
            }

            var temp = this.board[_i8][_j2];
            this.board[_i8][_j2] = 0;
            this.board[_i8 + counter][_j2] = temp;
          }
        }
      }

      return rows_clear;
    }
  }, {
    key: "over_stack_check",
    value: function over_stack_check() {
      //checks if stack goes above top, then ends if it does
      var flag = true;

      for (var i = 0; i < this.board[3].length; i++) {
        if (this.board[3][i] > 0) {
          flag = false;
        }
      }

      if (flag !== true) {
        var level_score = this.reset_all();
        this.highscore = Math.max(level_score[1], this.highscore);
        this.highlevel = Math.max(level_score[0], this.highlevel);
      }
    }
  }, {
    key: "time_drop_calc",
    value: function time_drop_calc() {
      this.droptime = 700 * Math.pow(0.86, 0.5 * this.level) + 200;
    }
  }, {
    key: "level_update",
    value: function level_update() {
      this.level = Math.max(this.level, Math.floor((-65 + Math.sqrt(13 * (325 + this.score * 2))) / 130));
      this.time_drop_calc();
    }
  }, {
    key: "reset_all",
    value: function reset_all() {
      //RESETS THE BOARD AND ALL THE SCORE, RETURNS THE SCORE AND LEVEL
      var score = this.score;
      var level = this.level;
      this.board = [];
      this.score = 0;
      this.level = 0;
      this.droptime = 900;
      this.pieces = [2, 3, 4, 5, 6, 7, 8]; //tracks for tetris "random generator"

      this.pivot = [];
      this.coor = [[0, 0], [0, 0], [0, 0], [0, 0]];
      this.hold = 0;
      this.next = [0, 0, 0]; //stores next three not including one in play

      this.create_board();
      return [level, score];
    }
  }, {
    key: "score_increase",
    value: function score_increase(lines_cleared) {
      //input of greater than 100 means I want to increment, not lines clear
      if (lines_cleared > 4) {
        var increment = lines_cleared / 100;
        this.score = this.score + increment * (this.level + 1);
      } else {
        if (lines_cleared === 1) {
          this.score = this.score + (this.level + 1) * 40;
        }

        if (lines_cleared === 2) {
          this.score = this.score + (this.level + 1) * 100;
        }

        if (lines_cleared === 3) {
          this.score = this.score + (this.level + 1) * 300;
        }

        if (lines_cleared === 4) {
          this.score = this.score + (this.level + 1) * 1200;
        }

        this.level_update();
      }

      return this.score;
    }
  }, {
    key: "stop_drop",
    value: function stop_drop() {
      clearInterval(this.interval);
    }
  }, {
    key: "start_drop",
    value: function start_drop() {
      var _this3 = this;

      clearInterval(this.interval);
      this.interval = setInterval(function () {
        _this3.piece_fall();
      }, this.droptime);
    }
  }]);

  return Board;
}();

exports["default"] = Board;