/**
 * initial snake by create div
 */

var nodes;
nodes= [ 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
];
// store new create divs
var divs = [];
var intervTime = 300;
var score = 0;
var Direction = {
		"LEFT" : 0,
		"UP" : 1,
		"RIGHT" : 2,
		"DOWN" : 3,
	};
// the start direction is right
var dir = Direction.RIGHT;
var initDom = function (){
	document.getElementById("score").innerText = score;
	for(var i = 0; i<nodes.length; ++i){
		var div = [];
		for( var j = 0; j<nodes[i].length; ++j){
			var newNode = document.createElement("div");
			newNode.className = "none";
			newNode.style.top = (40*i) + "px";
			newNode.style.left = (40*j) + "px";
			document.getElementById("game").append(newNode);
			div.push(newNode);
		}
		divs.push(div);
	}
};
var food = {
		x:  0,
		y:  0,
		show: function(){
			// show food
			nodes[this.y][this.x] = 2;
		},
		erase: function (){
			nodes[this.y][this.x] = 0;
		},
		changePosition: function(){
			this.x = Math.floor(Math.random()*nodes[0].length);
			this.y = Math.floor(Math.random()*nodes.length);
			//this.y = 0;
		}
	};
/**
 * refresh Divs to show the movement of snake
 * @param divs
 */
var refreshDivs = function (){
	for( var i = 0 ; i<nodes.length; i++){
		for( var j = 0 ; j < nodes[i].length; ++j){
			if( nodes[i][j] == 0)
				divs[i][j].className = "none";
			else if( nodes[i][j] == 1)
				divs[i][j].className = "snakeBody";
			else if( nodes[i][j] == 2 )
				divs[i][j].className = "food";
			else if( nodes[i][j] == 3 )
				divs[i][j].className = "snakeHead";
			else if( nodes[i][j] == 4 )
				divs[i][j].className = "snakeRear";
		}
	}
};

// get main div and set key down listener 
var bindKeyDown = function(){
	document.onkeydown = function( event){
		switch(event.which){
		case 65:// press 'a' or 'A'
		case 37:// press left arrow
			dir = Direction.LEFT;
			break;
		case 87:// press 'w' or 'W'
		case 38:// press up arrow
			dir = Direction.UP;
			break;
		case 68:// press 'd' or 'D'
		case 39:// press right arrow
			dir = Direction.RIGHT;
			break;
		case 83:// press 's' or 'S'
		case 40:// press down arrow
			dir = Direction.DOWN;
		}
	};
};
var start = function(){
	initDom();
	
	snake.init();
	refreshDivs();
};
var restart = function(){
	dir = Direction.RIGHT;
	snake.restart();
	refreshDivs();
	score = 0;
	document.getElementById("score").innerText = score;
};
bindKeyDown();
start();
var interv = window.setInterval(function(){
	var result = snake.forward();
	refreshDivs();
	if( result == -1){
		if(window.confirm("You have hit the wall,do you want to continue?"))
			restart();
		else
			clearInterval(interv);	
	}else if ( result == 1 ){
		//this.intervTime -= 10;
		score += 10;
		document.getElementById("score").innerText = score;
	}
}, this.intervTime);