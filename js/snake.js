// when document is ready, execute the function
var snake = {
	// method
	init: function() {
		initSnake();
		while(!isGeneFood());
		food.show();
		showInDivs();
	},
	forward: function(){
//		console.log("head.x= " + snake_head.x + ":" + "head.y= " + snake_head.y + 
//				", " + "food.x= " + food.x + ":" + "food.y= " + food.y);
		if(isOutOfBound()){
			return -1;
		}else if(isEaten()){
			addNode();
			food.erase();
			while(!isGeneFood())
				alert("found at food(" + food.x + "," + food.y);
			food.show();
			move();
			return 1;
		}
		move();
		return 0;
	},
	restart: function(){
		eraseSnake();
		food.erase();
		this.init();
	}

};
// fields
var snake_head;
var snake_rear;
var Node = function(x, y, nextNode, fontNode) {
	this.x = x;
	this.y = y;
	this.next = nextNode;
	this.font = fontNode;
};
function isGeneFood(){
	food.changePosition();
	//console.log("food(" + food.x + "," + food.y);
	var currNode = snake_head;
	while (currNode != null) {
		//console.log("snake(" + currNode.x + "," + currNode.y + ")");
		if( currNode.x == food.x && currNode.y == food.y)
			return false;
		currNode = currNode.next;
	}
	if(isEaten())
		return false;
	return true;
}
/**
 * snake moves and show nodes in divs
 */
function move() {
	
	// before move, erase the snake to redraw
	eraseSnake();
	
	// node forward
	var currNode = snake_rear;
	while (currNode != snake_head) {
		currNode.x = currNode.font.x;
		currNode.y = currNode.font.y;
		currNode = currNode.font;
	}
	switch (dir) {
	case Direction.LEFT:
		snake_head.x--;
		break;
	case Direction.RIGHT:
		snake_head.x++;
		break;
	case Direction.UP:
		snake_head.y--;
		break;
	case Direction.DOWN:
		snake_head.y++;
		break;
	}
	// show snake nodes in divs
	showInDivs();
	food.show();
};

// before move we should check if the head of snake is going to out of bound
function isOutOfBound() {
	switch (dir) {
	case Direction.LEFT:
		if (snake_head.x == 0)
			return true;
		break;
	case Direction.RIGHT:
		if (snake_head.x == nodes[0].length - 1)
			return true;
		break;
	case Direction.UP:
		if (snake_head.y == 0)
			return true;
		break;
	case Direction.DOWN:
		if (snake_head.y == nodes.length - 1)
			return true;
		break;
	}
	return false;
};
function isEaten() {
	switch (dir) {
	case Direction.LEFT:
		if (snake_head.x - 1 == food.x && snake_head.y == food.y)
			return true;
		break;
	case Direction.RIGHT:
		if (snake_head.x + 1 == food.x && snake_head.y == food.y)
			return true;
		break;
	case Direction.UP:
		if (snake_head.x == food.x && snake_head.y - 1 == food.y)
			return true;
		break;
	case Direction.DOWN:
		if (snake_head.x == food.x && snake_head.y + 1 == food.y)
			return true;
		break;
		default:
			console.log("error");
	}
	return false;
}

function showInDivs() {
	var currNode = snake_rear;
	while (currNode != null) {
		show(currNode);
		currNode = currNode.font;
	}
}
/**
 * initial snake, the length is 3 nodes
 */
function initSnake() {
	var initLen = 3;
	// initial position at x: 5 , y: 0
	// snake_head.font will be null forever
	snake_head = new Node(5, 0, null, null);
	var temp_node = snake_head;
	for (var i = 0; i < initLen - 1; ++i) {
		var newNode = new Node(temp_node.x - 1, temp_node.y, null,
				temp_node);
		temp_node.next = newNode;
		temp_node = newNode;
	}
	// temp_node is the rear of the queue
	// temp_node.next is null
	snake_rear = temp_node;
}
/**
 * 
 */
function show(snake_node) {
	// only change head position of snake queue
	if (snake_node === snake_head)
		nodes[snake_node.y][snake_node.x] = 3;// head
	else if(snake_node === snake_rear)
		nodes[snake_node.y][snake_node.x] = 4;// rear
	else
		nodes[snake_node.y][snake_node.x] = 1;// middle body
}
function eraseSnake() {
	// erase the queue
	var currNode = snake_head;
	while (currNode != null) {
		nodes[currNode.y][currNode.x] = 0;
		currNode = currNode.next;
	}
}
function addNode() {
	var node = new Node(snake_rear.x, snake_rear.y, null, snake_rear);
	snake_rear.next = node;
	snake_rear = node;
}